"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3_1 = require("./s3");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/jpg",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        return cb(null, false);
    }
};
const bucketName = process.env.AWS_BUCKET_NAME;
if (!bucketName) {
    throw new Error("AWS_BUCKET_NAME value is not defined in .env file");
}
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3_1.s3client,
        bucket: "optimisticbucket",
        key: function (req, file, cb) {
            const user = req.user;
            const locals = req.locals;
            cb(null, `facebook_clone/${locals.path}/${user.userName}_${locals.date}.${file.mimetype.split("/")[1]}`);
        },
    }),
    fileFilter,
});
exports.default = upload;
