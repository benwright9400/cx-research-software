import { Types } from "mongoose";
import Purpose, { IPurpose } from "../models/Purpose"; // adjust path as needed
import { getMongoDB } from "../MongoDB";

await getMongoDB();

// Create a new purpose
export async function createPurpose(
  data: Partial<IPurpose>
): Promise<IPurpose> {
  await getMongoDB();
  const purpose = await Purpose.create(data);
  return purpose;
}

// Get a purpose by its ID
export async function getPurposeById(id: string): Promise<IPurpose | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid purpose ID");
  }
  return Purpose.findById(id).exec();
}

// Get all purposes for a specific URI
export async function getPurposesByUri(uri: string): Promise<IPurpose[]> {
  await getMongoDB();
  return Purpose.find({ uri }).exec();
}

// Get all purposes
export async function getAllPurposes(): Promise<IPurpose[]> {
  await getMongoDB();
  return Purpose.find().exec();
}

// Update a purpose by ID
export async function updatePurpose(
  id: string,
  data: Partial<IPurpose>
): Promise<IPurpose | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid purpose ID");
  }
  return Purpose.findByIdAndUpdate(id, data, { new: true }).exec();
}

// Delete a purpose by ID
export async function deletePurpose(id: string): Promise<IPurpose | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid purpose ID");
  }
  return Purpose.findByIdAndDelete(id).exec();
}
