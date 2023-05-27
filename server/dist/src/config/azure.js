"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cognitiveservices_computervision_1 = require("@azure/cognitiveservices-computervision");
const ms_rest_js_1 = require("@azure/ms-rest-js");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Authenticate a new ComputerVisionClient using the key and endpoint
// This Client will be used in all image analysis
const key = process.env.AZURE_KEY;
const endpoint = process.env.AZURE_ENDPOINT;
if (!key) {
    throw new Error("AZURE_KEY value is not defined in .env file");
}
if (!endpoint) {
    throw new Error("AZURE_ENDPOINT value is not defined in .env file");
}
const computerVisionClient = new cognitiveservices_computervision_1.ComputerVisionClient(new ms_rest_js_1.ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }), endpoint);
exports.default = computerVisionClient;
