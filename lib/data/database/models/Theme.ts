import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITheme extends Document {
  uri?: string | undefined;
  purposeId?: string | undefined;
  theme?: string | undefined;
  description?: string | undefined;
  codes: number[];
  createdAt: Date;
}

const ThemeSchema: Schema<ITheme> = new Schema<ITheme>(
  {
    uri: { type: String, required: false },
    purposeId: { type: String, required: false },
    theme: { type: String, required: false },
    description: { type: String, required: false },
    codes: [{ type: Number, required: false }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Theme ||
  mongoose.model<ITheme>("Theme", ThemeSchema);
