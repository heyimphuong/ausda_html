import Role from "../models/Role.js";

export const createRole = async (req, res) => {
  try {
    const { role_name, document_type } = req.body;
    const role = new Role({ role_name, document_type });
    await role.save();
    res.json({ success: true, role });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
