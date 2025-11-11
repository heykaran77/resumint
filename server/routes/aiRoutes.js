import express from "express";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/enh-pro-sum", enhanceProfessionalSummary);
aiRouter.post("/enh-job-des", enhanceJobDescription);
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;
