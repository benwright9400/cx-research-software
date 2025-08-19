import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUploadedFile extends Document {
  uri?: string;
  accountId?: string;
  fileName?: string;
  status?: string;
  createdAt?: Date;
}

const UploadedFileSchema: Schema<IUploadedFile> = new Schema<IUploadedFile>(
  {
    uri: { type: String, required: false },
    fileName: { type: String, required: false },
    status: { type: String, required: false },
    accountId: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.UploadedFile ||
  mongoose.model<IUploadedFile>("UploadedFile", UploadedFileSchema);
