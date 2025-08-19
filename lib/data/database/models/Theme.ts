import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITheme extends Document {
  uri?: string | undefined;
  purposeId?: string | undefined;
  theme?: string | undefined;
  description?: string | undefined;
  codes: {}[];
  createdAt: Date;
}

const ThemeSchema: Schema<ITheme> = new Schema<ITheme>(
  {
    uri: { type: String, required: false },
    purposeId: { type: String, required: false },
    theme: { type: String, required: false },
    description: { type: String, required: false },
    codes: [{ type: Object, required: false }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Theme ||
  mongoose.model<ITheme>("Theme", ThemeSchema);
