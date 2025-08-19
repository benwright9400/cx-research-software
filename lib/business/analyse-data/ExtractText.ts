import { getBufferedFile } from "@/lib/data/services/S3Service";
import mammoth from "mammoth";

export default async function extractText(uri: string) {
  console.log(uri);

  const bufferedFile: Buffer = await getBufferedFile(uri);

  console.log(bufferedFile);

  console.log("typeof bufferedFile:", typeof bufferedFile); // should be object
  console.log("isBuffer:", Buffer.isBuffer(bufferedFile)); // should be true

  if (uri.endsWith(".docx")) {
    const doc = await mammoth.extractRawText({ buffer: bufferedFile });

    console.log(doc);

    return doc.value;
  }

  throw new Error(
    "Attempted to analyse unsupported file type; only .docx files are permitted"
  );
}
