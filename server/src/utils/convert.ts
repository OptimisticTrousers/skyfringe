import jpeg from "jpeg-js";
import tf from "@tensorflow/tfjs-node";

const convert = async (img: any) => {
    // Decoded image in UInt8 Byte array
    const image = await jpeg.decode(img, { useTArray: true })

    const numChannels = 3;
    const numPixels = image.width * image.height;
    const values = new Int32Array(numPixels * numChannels);

    for (let i = 0; i < numPixels; i++) {
        for (let c = 0; c < numChannels; ++c) {
            values[i * numChannels + c] = image.data[i * 4 + c];
        }
    }

    console.log(img)

    return tf.tensor3d(values, [image.height, image.width, numChannels], "int32")
}

export default convert;