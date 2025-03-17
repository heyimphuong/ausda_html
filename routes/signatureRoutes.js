import express from "express";
import { createSignatures, signDocument, getSignaturesByDocument } from "../controllers/signatureController.js";

const router = express.Router();

router.post("/", createSignatures);
router.post("/sign", signDocument);
router.get("/:document_id", getSignaturesByDocument);

export default router;
