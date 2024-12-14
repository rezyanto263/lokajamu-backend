const tfjs = require('@tensorflow/tfjs-node');
const fs = require('fs');

let model;

const loadModel = async () => {
  model = await tfjs.loadGraphModel(process.env.MODEL_URL);
};

const predictions = async (imageFilePath) => {
  if (!model) throw new Error('Model has not been loaded yet');

  try {
    const imageFile = fs.readFileSync(imageFilePath);

    let inputTensor = tfjs.node.decodeImage(imageFile);

    if (inputTensor.shape[2] === 4) {
      inputTensor = inputTensor.slice([0, 0, 0], [-1, -1, 3]);
    }

    inputTensor = inputTensor
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tfjs.scalar(255))
      .expandDims(0);

    const prediction = model.predict(inputTensor).data();

    return prediction;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};

module.exports = { loadModel, predictions };