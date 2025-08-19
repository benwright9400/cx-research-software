import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPurpose extends Document {
  uri?: string | undefined;
  purpose?: string | undefined;
  createdAt: Date;
}

const PurposeSchema: Schema<IPurpose> = new Schema<IPurpose>(
  {
    uri: { type: String, required: false },
    purpose: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Purpose ||
  mongoose.model<IPurpose>("Purpose", PurposeSchema);
