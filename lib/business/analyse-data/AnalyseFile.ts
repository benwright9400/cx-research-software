import { invokeModel } from "@/lib/data/services/LLMService";
import extractText from "./ExtractText";
import { createPurpose } from "@/lib/data/database/repositories/PurposeRepository";
import {
  createCode,
} from "@/lib/data/database/repositories/CodeRepository";
import { createTheme } from "@/lib/data/database/repositories/ThemeRepository";
import { Analysis } from "@/types/analysis";

export default async function analyseFile(uri: string) {
  const fileText = await extractText(uri);

  const analysis: Analysis = await invokeModel(fileText);


  const purpose = await createPurpose({
    uri: uri,
    purpose: analysis.purpose,
  });

  const purposeId = purpose._id as string;


  let analysisCodes = analysis.codes;
  analysisCodes.forEach(async (code) => {
    await createCode({
      uri: uri,
      purposeId: purposeId,
      code: code.code,
      rationale: code.rationale,
      localId: code.id,
    });
  });


  let analysisThemes = analysis.themes;
  analysisThemes.forEach(async (theme) => {
    await createTheme({
      theme: theme.theme,
      description: theme.description,
      codes: theme.codes,
      purposeId: purposeId,
      uri: uri,
    });
  });


  console.log(analysis);
  return analysis;
}
