import { Types } from "mongoose";
import Code, { ICode } from "../models/Code"; // adjust path as needed
import { getMongoDB } from "../MongoDB";

await getMongoDB();

// Create a new code
export async function createCode(data: Partial<ICode>): Promise<ICode> {
  await getMongoDB();
  const code = await Code.create(data);
  return code;
}

// Get a code by its ID
export async function getCodeById(id: string): Promise<ICode | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid code ID");
  }
  return Code.findById(id).exec();
}

// Get a code by its URI
export async function getCodesByUri(uri: string): Promise<ICode[]> {
  await getMongoDB();
  return Code.find({ uri }).exec();
}

// Get all codes
export async function getAllCodes(): Promise<ICode[]> {
  await getMongoDB();
  return Code.find().exec();
}

// Update a code by ID
export async function updateCode(
  id: string,
  data: Partial<ICode>
): Promise<ICode | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid code ID");
  }
  return Code.findByIdAndUpdate(id, data, { new: true }).exec();
}

// Delete a code by ID
export async function deleteCode(id: string): Promise<ICode | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid code ID");
  }
  return Code.findByIdAndDelete(id).exec();
}
