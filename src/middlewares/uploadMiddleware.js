import multer from "multer";
import path from "path";
import fs from "fs";

// Create the directory if it doesn't exist
const uploadPath = path.join("uploads", "dxf");
fs.mkdirSync(uploadPath, { recursive: true });

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter for DXF only
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/dxf" ||
    file.originalname.endsWith(".dxf")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only DXF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
