import mongoose, { Model, Schema } from "mongoose";

export interface IUploadedFile extends Document {
  uri: string;
  accountId: string;
  fileName: string;
  status: string;
  createdAt: Date;
}

const UploadedFileSchema: Schema<IUploadedFile> = new Schema<IUploadedFile>(
  {
    uri: { type: String, required: true },
    fileName: {type: String, required: true},
    status: {type: String, required: true},
    accountId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.UploadedFile || mongoose.model<IUploadedFile>("UploadedFile", UploadedFileSchema);
