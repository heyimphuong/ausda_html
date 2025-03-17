import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

import roleRoutes from "./routes/roleRoutes.js";
import signatureRoutes from "./routes/signatureRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kết nối MongoDB
connectDB();

// Định tuyến API
app.use("/api/roles", roleRoutes);
app.use("/api/signatures", signatureRoutes);

// Chạy server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
