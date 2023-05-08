import fs from "fs";
import aws from "aws-sdk";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { PassThrough } from "stream";
import { config } from "dotenv";

// Setting up ENV variables, specifically for S3_BUCKET
config();

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!bucketName) {
  throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
}

if (!accessKeyId) {
  throw new Error("AWS_ACCESS_KEY_ID value is not defined in .env file");
}

if (!secretAccessKey) {
  throw new Error("AWS_SECRET_ACCESS_KEY value is not defined in .env file");
}

const s3client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const s3Uploadv3 = async (path: string, file: Express.Multer.File) => {
  try {
    // Configure the upload details to send to S3
    const uploadParams = {
      Bucket: bucketName,
      Body: fs.createReadStream(file.buffer),
      Key: `facebook_clone/${path}`,
      ContentType: file.mimetype,
    };

    await s3client.send(new PutObjectCommand(uploadParams));

    // Send the upload to S3
    const response = await s3client.send(new PutObjectCommand(uploadParams));
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const s3Deletev3 = async (path: string, fileName: string) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: `facebook_clone/${path}`,
    };

    const response = await s3client.send(new DeleteObjectCommand(deleteParams));
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
