import Signature from "../models/Signature.js";

export const createSignatures = async (req, res) => {
  try {
    const { document_id, role_ids } = req.body;
    const signatures = role_ids.map(role_id => ({ document_id, role_id }));
    await Signature.insertMany(signatures);
    res.json({ success: true, message: "Tạo tài liệu thành công" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const signDocument = async (req, res) => {
  try {
    const { document_id, role_id, signed_by } = req.body;
    const signature = await Signature.findOneAndUpdate(
      { document_id, role_id, signed_by: null },
      { signed_by, signed_at: new Date() },
      { new: true }
    );

    if (!signature) {
      return res.status(400).json({ success: false, message: "Tài liệu đã được ký hoặc không hợp lệ" });
    }

    res.json({ success: true, message: "Đã ký thành công", signature });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getSignaturesByDocument = async (req, res) => {
  try {
    const signatures = await Signature.find({ document_id: req.params.document_id }).populate("role_id");
    res.json(signatures);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
