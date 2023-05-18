import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { config } from "dotenv";

config();

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

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

export default computerVisionClient;
