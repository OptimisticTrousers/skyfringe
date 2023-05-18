import computerVisionClient from '../config/azure';

// Using the Azure ComputerVision Image Analysis API, we can extract AI-generated human-readable image descriptions, which can later be included as alt text for user-uploaded images
const generateAltText = async (imageUrl: string) => {
  try {
    // Gather a base object containing lots of data about the image (e.g. tags, descriptions, and metadata)
    const imageInfo = await computerVisionClient.describeImage(imageUrl) as any;
    // Extract the most confident human-readable description, i.e. the first caption
    return imageInfo.captions[0].text;
  } catch (error) {
    console.error(error);
  }

}

export default generateAltText;
