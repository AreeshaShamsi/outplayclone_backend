import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js"; // Match casing exactly

dotenv.config();
// console.log(process.env.DB_NAME);

// Enable CORS

const app = express();
app.use(express.json());
app.use(cors());

// Make sure the route prefix matches your request
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
