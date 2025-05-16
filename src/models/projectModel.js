import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    building_type: {
      type: String,
      required: true,
      unique: true,
    },
    sub_building_type: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      required: true,
      unique: true,
    },
    project_data: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", userSchema);
