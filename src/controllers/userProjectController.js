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

// Add project_data

// // Update nested key inside project_data
// export const updateNestedProjectData = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { mainKey, nestedKey, value } = req.body;

//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (!user.project_data || !user.project_data[mainKey]) {
//       return res.status(400).json({ error: "Main key does not exist" });
//     }

//     user.project_data[mainKey][nestedKey] = value;

//     const updatedUser = await user.save();
//     res.status(200).json(updatedUser.project_data[mainKey]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
