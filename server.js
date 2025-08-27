import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import apiRoute  from "./api/v1/members.js";
import {connectMongo} from "./config/mongo.js";

dotenv.config()
const app = express();

const corsOption = {
  origin: ["http://localhost:5173","http://localhost:5174", "http://localhost:5175"],
};
app.use(cors(corsOption));
app.use(express.json());

app.use("/",apiRoute)

app.use((req, res, next) => {
  const error = new Error("Not found...");
  error.status = 404;
  next(error);
});

// centralized error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

const PORT = 3000;
(async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  } catch (err) {
    console.error("‼️ Startup error:", err);
    process.exit(1);
  }
})();
