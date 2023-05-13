import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3client } from "./s3";
import { config } from "dotenv";
import { User as IUser, Post as IPost } from "../../types";

config();

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
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(null, false);
  }
};

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
  throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
}

const upload = multer({
  storage: multerS3({
    s3: s3client,
    bucket: "optimisticbucket",
    key: function (req: any, file, cb) {
      const user = req.user as IUser;
      cb(
        null,
        `facebook_clone/${req.key.path}/${req.key.date}_${user.userName}.${
          file.mimetype.split("/")[1]
        }`
      );
    },
  }),
  fileFilter,
});

export default upload;
