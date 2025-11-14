import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow both localhost and production frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://resumint-builder.vercel.app",
];

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Connect to DB on first request
let dbConnected = false;
const ensureDBConnection = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await ensureDBConnection();
    next();
  } catch (error) {
    console.error("DB Connection middleware error:", error);
    res.status(503).json({ message: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Server is live..." });
});

// API Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

export default app;
