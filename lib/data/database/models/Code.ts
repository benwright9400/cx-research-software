import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICode extends Document {
  uri?: string | undefined;
  purposeId?: string | undefined;
  code?: string | undefined;
  localId?: number | undefined;
  rationale?: string | undefined;
  createdAt: Date;
}

const CodeSchema: Schema<ICode> = new Schema<ICode>(
  {
    uri: { type: String, required: false },
    purposeId: { type: String, required: false },
    code: { type: String, required: false },
    localId: { type: Number, required: false },
    rationale: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Code ||
  mongoose.model<ICode>("Code", CodeSchema);
