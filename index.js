import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js"; // Match casing exactly

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running... Welcome to the Lead Management Server!");
});

// Lead routes
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
