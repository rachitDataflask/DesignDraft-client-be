import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    building_type: {
      type: String,
      required: true,
    },
    sub_building_type: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    project_data: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", userSchema);
