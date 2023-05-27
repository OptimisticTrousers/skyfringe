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
const azure_1 = __importDefault(require("../config/azure"));
// Using the Azure ComputerVision Image Analysis API, we can extract AI-generated human-readable image descriptions, which can later be included as alt text for user-uploaded images
const generateAltText = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Gather a base object containing lots of data about the image (e.g. tags, descriptions, and metadata)
        const imageInfo = yield azure_1.default.describeImage(imageUrl);
        // Extract the most confident human-readable description, i.e. the first caption
        return imageInfo.captions[0].text;
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = generateAltText;
