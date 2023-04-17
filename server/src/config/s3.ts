import fs from "fs";
import aws from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Uploadv3 = async (path: string, file: Express.Multer.File) => {
  try {
    const s3client = new S3Client({ region: "us-east-1" });

    const param = {
      Bucket: process.env.S3_BUCKET,
      Key: `facebook_clone/${path}/${file.originalname}${file.mimetype}`,
      ContentType: file.mimetype,
      Body: fs.createReadStream(file.path),
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
