import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
