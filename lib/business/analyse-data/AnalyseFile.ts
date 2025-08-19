import { invokeModel } from "@/lib/data/services/LLMService";
import extractText from "./ExtractText";

export default async function analyseFile(uri: string) {
  const fileText = await extractText(uri);

  const purpose = await invokeModel(
    "System: You are a system which identifies the purpose of a document to support coding and theme extraction.",
    "Human: return only explicit text at a high level showing purpose of the following text:",
    fileText
  );

  console.log(purpose);

}
