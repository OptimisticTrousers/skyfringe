import { useState } from "react";

// Handle file input from HTML file input provide image data that can be fed to <img> tag for thumbnail display
export const useImageThumbnail = () => {
  const [imageData, setImageData] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Take file input from HTML input and convert it to a thumbnail for UI
  const handleFile = (file: any) => {
    // Create a new FileReader instance to convert the File object into a readable stream of data for UI display
    const reader = new FileReader();

    // Set appropriate loading states to update relevant UI
    reader.onloadstart = (function () {
      return () => {
        setImageData(null)
        setImageLoading(true);
        setImageError(false);
      }
    })();

    // Announce an error if once occurs
    reader.onerror = (function () {
      return () => {
        setImageError(true);
      }
    })();

    // Called once the reader instance completes the read. This pattern of an immediately called function is required for correct behaviour
    reader.onload = (function () {
      return (e: any) => {
        setImageLoading(false);
        setImageError(false);
        // Result of file read (i.e. the image data) can be accessed using e.target.result
        setImageData(e.target.result);
      }
    })();

    // Commence the file read using the parameter File object obtained from an HTML file input
    reader.readAsDataURL(file);
  };

  const removeThumbnail = () => {
    setImageData(null);
  }

  return { 
    handleFile, 
    removeThumbnail,
    imageData, 
    imageLoading, 
    imageError,
    setImageData 
  };
}