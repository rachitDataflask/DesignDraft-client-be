import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    scale: {
      type: Number,
    },
    floor: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
