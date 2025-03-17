import mongoose from "mongoose";

export const SignatureSchema = new mongoose.Schema({
  document_id: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  signed_by: { type: String, default: null },
  signed_at: { type: Date, default: null }
});

const Signature = mongoose.model("Signature", SignatureSchema);
export default Signature;

