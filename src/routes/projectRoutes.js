import express from "express";
import {
  //   getUserProjectData,
  listAllProjects,
  createProject,
  updateProjectData,
  deleteProjectData,
  //   updateNestedProjectData,
} from "../controllers/userProjectController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/project-data", verifyToken, getUserProjectData);
router.get("/project", verifyToken, listAllProjects);
router.post("/project", verifyToken, createProject);
router.delete("/project/:id", verifyToken, deleteProjectData);
// router.patch("/project-data/:id", verifyToken, updateProjectData);
// router.patch("/project-data/nested", verifyToken, updateNestedProjectData);

export default router;
