import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../server/configs/db.js";
import userRouter from "../server/routes/userRoutes.js";
import resumeRouter from "../server/routes/resumeRoutes.js";
import aiRouter from "../server/routes/aiRoutes.js";

const app = express();

// Connect to DB
await connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://your-frontend.vercel.app"
];

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true 
}));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is live..." });
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

export default app;
