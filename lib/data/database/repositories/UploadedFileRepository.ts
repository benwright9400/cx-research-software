import UploadedFile, { IUploadedFile } from "../models/UploadedFile";
import { getMongoDB } from "../MongoDB";

// Create
export async function logFile(
  uri: string,
  accountId: string,
  fileName: string
) {
  await getMongoDB();
  console.log("saving:", {
    uri: uri,
    accountId: accountId,
    fileName: fileName,
    status: "PROCESSING",
  });

  const file = await UploadedFile.create({
    uri: uri,
    accountId: accountId,
    fileName: fileName,
    status: "PROCESSING",
  });
  return file;
}

// Get all for Id
export async function getFilesListHeldByUserId(
  id: string
): Promise<IUploadedFile[]> {
  await getMongoDB();
  return await UploadedFile.find({ accountId: id });
}

// Delete
export async function deleteFile(uri: string, accountId: string) {
  await getMongoDB();
  return await UploadedFile.deleteOne({ uri, accountId });
}
