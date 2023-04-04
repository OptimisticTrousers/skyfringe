import { Request } from "express-serve-static-core";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

export default upload;
