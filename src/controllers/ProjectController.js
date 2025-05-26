import Project from "../models/projectModel.js";
import path from "path";
import fs from "fs";
import DxfParser from "dxf-parser";

export const createProject = async (req, res) => {
  try {
    const { user, name, location, building_type, sub_building_type, level } =
      req.body;

    // Path to the uploaded file
    const dxfFilePath = req.file
      ? path.join(req.file.destination, req.file.filename)
      : null;

    let parsedData = null;

    if (dxfFilePath) {
      const parser = new DxfParser();
      const dxfContents = fs.readFileSync(dxfFilePath, "utf-8");
      try {
        parsedData = parser.parseSync(dxfContents);
      } catch (parseErr) {
        return res
          .status(400)
          .json({ error: "Invalid DXF file", details: parseErr.message });
      }
    }

    // Create the project in the database
    const newProject = new Project({
      user,
      name,
      location,
      building_type,
      sub_building_type,
      level,
      dxf_file: dxfFilePath, // optional: save the path for later reference
    });

    await newProject.save();
    const Entities = parsedData.entities;
    res.status(201).json({
      message: `${name} successfully created`,
      entities: Entities,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listAllProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ user: userId });
    console.log(projects);

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProjectData = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { project_data } = req.body;

    const project = await Project.findOne({
      _id: projectId,
    });

    project.project_data = {};
    await project.save();

    if (project.project_data) {
      project.project_data = {
        ...project.project_data,
        ...project_data,
      };
      await project.save();
    }

    res.status(200).json({
      message: "Project data updated successfully",
      // project_data: updated.project_data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProjectData = async (req, res, next) => {
  try {
    console.log("User from token:", req.user);
    const projectId = req.params.id;

    const project = await Project.findOne({
      _id: projectId,
      user: req.user.id,
    });

    if (!project) {
      return res
        .status(404)
        .json({ error: "Project not found or unauthorized" });
    }

    await project.deleteOne();

    res.send({
      status: 200,
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
