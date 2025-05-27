import mongoose, { Mongoose } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    dxf_entities: { type: Object, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
