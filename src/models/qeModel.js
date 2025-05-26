import mongoose, { Mongoose } from "mongoose";

const qeSchema = new mongoose.Schema(
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
    service: {
      type: String,
      required: true,
    },
    building_type: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    dxf_file: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("qeProject", qeSchema);
