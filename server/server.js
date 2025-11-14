import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

// Connect to DB
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Allow both localhost and production frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
  res.send("Server is live...");
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// For Vercel serverless functions
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

export default app;
