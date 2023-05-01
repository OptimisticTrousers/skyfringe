import fs from "fs";
import aws from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { PassThrough } from "stream";

export const s3Uploadv3 = async (path: string, file: Express.Multer.File) => {
  try {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!(accessKeyId && secretAccessKey)) {
      throw new Error(
        "AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY value is not defined in .env file"
      );
    }
    const s3client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const fileContent = new PassThrough();
    fileContent.end(file.buffer);

    const param = {
      Bucket: process.env.S3_BUCKET,
      Key: `facebook_clone/${path}/${file.originalname}${file.mimetype}`,
      ContentType: file.mimetype,
      Body: fileContent,
    };

    const data = await s3client.send(new PutObjectCommand(param));
    console.log(`Success. Object uploaded. ${data}`);
    console.log(data);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const s3Deletev3 = async (path: string, fileName: string) => {
  try {
    const param = {
      Bucket: process.env.S3_BUCKET!,
      Key: `facebook_clone/${path}/${fileName}`,
    };
    const s3 = new aws.S3();
    s3.deleteObject(param, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log(`Success. Object deleted`);
      }
    });
  } catch (error) {
    console.error(`Error uploading file to S3: ${error}`);
    throw error;
  }
};
