// import User from "../models/userModel.js";
import Project from "../models/projectModel.js";

export const createProject = async (req, res) => {
  try {
    const { user, name, location, building_type, sub_building_type, level } =
      req.body;

    const newProject = new Project({
      user,
      name,
      location,
      building_type,
      sub_building_type,
      level,
    });
    await newProject.save();
    res.status(201).json({ message: `${name} successfully created` });
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

    // console.log("------------------------", projectId, project_data);

    const project = await Project.findOne({
      _id: projectId,
      // user: req.user.id,
    });
    // if (!project) {
    //   return res
    //     .status(401)
    //     .json({ error: "Project not found or unauthorized" });
    // }

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
