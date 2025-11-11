import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/ResumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", upload.single("image"), protect, updateResume);
resumeRouter.delete(
  "/delete/:resumeID",
  upload.single("image"),
  protect,
  deleteResume
);
resumeRouter.get("/get/:resumeID", protect, getResumeById);
resumeRouter.get("/public/:resumeID", getPublicResumeById);

export default resumeRouter;
