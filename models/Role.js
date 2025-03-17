import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  role_name: { type: String, required: true },
  document_type: { type: String, required: true }
});

const Role = mongoose.model("Role", RoleSchema);
export default Role;
