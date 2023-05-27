"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Deletev3 = exports.s3Uploadv3 = exports.s3client = exports.bucketName = void 0;
const fs_1 = __importDefault(require("fs"));
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = require("dotenv");
// Setting up ENV variables, specifically for S3_BUCKET
(0, dotenv_1.config)();
exports.bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
if (!exports.bucketName) {
    throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
}
if (!accessKeyId) {
    throw new Error("AWS_ACCESS_KEY_ID value is not defined in .env file");
}
if (!secretAccessKey) {
    throw new Error("AWS_SECRET_ACCESS_KEY value is not defined in .env file");
}
exports.s3client = new client_s3_1.S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
const s3Uploadv3 = (path, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configure the upload details to send to S3
        const uploadParams = {
            Bucket: exports.bucketName,
            Body: fs_1.default.createReadStream(file.buffer),
            Key: `facebook_clone/${path}`,
            ContentType: file.mimetype,
        };
        yield exports.s3client.send(new client_s3_1.PutObjectCommand(uploadParams));
        // Send the upload to S3
        const response = yield exports.s3client.send(new client_s3_1.PutObjectCommand(uploadParams));
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
});
exports.s3Uploadv3 = s3Uploadv3;
const s3Deletev3 = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteParams = {
            Bucket: "optimisticbucket",
            Key: `facebook_clone/${path}`,
        };
        const response = yield exports.s3client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
        console.log(response);
    }
    catch (error) {
        console.error(error);
    }
});
exports.s3Deletev3 = s3Deletev3;
