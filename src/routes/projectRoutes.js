import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
  listAllProjects,
  createProject,
  updateProjectData,
  deleteProjectData,
} from "../controllers/ProjectController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/project", verifyToken, listAllProjects);
router.post("/project", verifyToken, upload.single("dxf_file"), createProject);
router.delete("/project/:id", verifyToken, deleteProjectData);

export default router;
