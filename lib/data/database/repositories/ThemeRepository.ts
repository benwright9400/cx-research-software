import { Types } from "mongoose";
import Theme, { ITheme } from "../models/Theme";
import { getMongoDB } from "../MongoDB";

// Create a new theme
export async function createTheme(data: Partial<ITheme>): Promise<ITheme> {
  await getMongoDB();
  const theme = await Theme.create(data);
  return theme;
}

// Get a theme by its ID
export async function getThemeById(id: string): Promise<ITheme | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid theme ID");
  }
  return Theme.findById(id).exec();
}

// Get all themes for a specific URI
export async function getThemesByUri(uri: string): Promise<ITheme[]> {
  await getMongoDB();
  return Theme.find({ uri }).exec();
}

// Get all themes
export async function getAllThemes(): Promise<ITheme[]> {
  await getMongoDB();
  return Theme.find().exec();
}

// Update a theme by ID
export async function updateTheme(
  id: string,
  data: Partial<ITheme>
): Promise<ITheme | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid theme ID");
  }
  return Theme.findByIdAndUpdate(id, data, { new: true }).exec();
}

// Delete a theme by ID
export async function deleteTheme(id: string): Promise<ITheme | null> {
  await getMongoDB();
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid theme ID");
  }
  return Theme.findByIdAndDelete(id).exec();
}
