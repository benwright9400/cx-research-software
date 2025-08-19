import { invokeModel } from "@/lib/data/services/LLMService";
import extractText from "./ExtractText";
import { createPurpose } from "@/lib/data/database/repositories/PurposeRepository";
import {
  createCode,
  getCodesByUri,
} from "@/lib/data/database/repositories/CodeRepository";
import { createTheme } from "@/lib/data/database/repositories/ThemeRepository";

function chunkText(text: string): string[] {
  const maxChars = 400 * 4;
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    // Determine tentative end
    let end = Math.min(start + maxChars, text.length);

    // Try to find nearest paragraph break within this range
    const paragraphBreak = text.lastIndexOf("\n\n", end);
    if (paragraphBreak > start) {
      end = paragraphBreak + 2; // include the paragraph break
    }

    const chunk = text.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    start = end;
  }

  return chunks;
}

export default async function analyseFile(uri: string) {
  const fileText = await extractText(uri);

  // Get purpose first
  const purpose = await invokeModel(
    "System: You are a system which identifies the purpose of a document to support coding and theme extraction.",
    "Human: return only explicit text at a high level showing purpose of the following text:",
    fileText,
    200
  );

  console.log("Purpose:", purpose);

  const purposeObj = await createPurpose({
    uri: uri,
    purpose: purpose,
  });

  await new Promise((res) => setTimeout(res, 400));

  console.log("Purpose:", purpose);

  let chunks = chunkText(fileText);

  console.log(chunks);

  for (const text of chunks) {
    let codes: string | null = null;

    // Retry loop with exponential backoff
    for (let attempt = 0; attempt < 7; attempt++) {
      try {
        codes = await invokeModel(
          "System: You are a system which extracts codes as part of a thematic analysis using some purpose text as a guide.",
          `Human: return a list of up to 5 important codes guided by the purpose (${purpose})\n\n return the codes as ONLY a stringified array of JSON objects \n\n exclude any characters which are not a part of the JSON\n\n include the code and the rationale for selecting it\n\n be succinct:`,
          text,
          Math.ceil(purpose.length * 4)
        );
        break; // success
      } catch (e: any) {
        // exponential backoff with jitter
        const delay =
          500 * Math.pow(2, attempt) + Math.floor(Math.random() * 200);
        console.warn(`Throttled. Retry ${attempt + 1} in ${delay}ms`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }

    if (!codes) {
      console.error("Failed to get codes for chunk:", text.slice(0, 50));
      continue;
    }

    const parsedCodes = JSON.parse(codes);
    console.log("Codes:", parsedCodes);

    console.log("purpose object:", purposeObj);

    parsedCodes.forEach((element) => {
      createCode({
        uri: uri,
        purposeId: purposeObj._id,
        code: element.code,
        rationale: element.rationale,
      });
    });

    // Small pause before next chunk to reduce chance of throttling
    await new Promise((res) => setTimeout(res, 400));
  }

  const codes = await getCodesByUri(uri);

  let codeString = "";

  codes.forEach((code) => {
    codeString += code.rationale + "\n\n";
  });

  console.log(codeString);

  chunks = chunkText(codeString);

  await new Promise((res) => setTimeout(res, 6000));

  let themeInformation = "";

  let themes: string;
  for (const text of chunks) {
    for (let attempt = 0; attempt < 7; attempt++) {
      try {
        themes = await invokeModel(
          "System: You are a system which identifies themes from JSON codes which align with the purpose.",
          `Human: return a maximum of three themes as short sentences:`,
          text,
          200
        );
        break; // success
      } catch (e: any) {
        // exponential backoff with jitter
        const delay =
          500 * Math.pow(2, attempt) + Math.floor(Math.random() * 200);
        console.warn(`Throttled. Retry ${attempt + 1} in ${delay}ms`);
        await new Promise((res) => setTimeout(res, delay));
      }
    }

    themeInformation += themes;

    console.log("Theme excerpt:\n\n", themes);

    await new Promise((res) => setTimeout(res, 30000));
  }

  await new Promise((res) => setTimeout(res, 60000));

  themes = await invokeModel(
    "System: You are a system which identifies themes as part of a thematic analysis.",
    `Human: return a maximum of five high level themes, based on the purpose (${purpose}), as stringified JSON objects of the format {theme: string, description: string}\n\n exclude any character which are not JSON:`,
    themeInformation,
    2000
  );

  console.log("Theme information:\n\n", themeInformation);

  const parsedThemes = JSON.parse(themeInformation);

  parsedThemes.forEach((theme) => {
    createTheme({
      uri: uri,
      theme: theme.theme,
      description: theme.description,
    });
  });

  console.log(parsedThemes);
}
