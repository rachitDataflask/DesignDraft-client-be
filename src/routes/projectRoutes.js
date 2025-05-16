import express from "express";
import {
  //   getUserProjectData,
  listAllProjects,
  createProject,
  updateProjectData,
  //   updateNestedProjectData,
} from "../controllers/userProjectController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/project-data", verifyToken, getUserProjectData);
router.get("/project-data", verifyToken, listAllProjects);
router.post("/project-data", verifyToken, createProject);
router.patch("/project-data/:id", verifyToken, updateProjectData);
// router.patch("/project-data/nested", verifyToken, updateNestedProjectData);

export default router;
