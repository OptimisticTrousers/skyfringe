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
    const error = new Error(
      "File format not supported. Please upload jpg/webp/png/jpeg/gif only."
    );
    cb(error as any, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

export default upload;
