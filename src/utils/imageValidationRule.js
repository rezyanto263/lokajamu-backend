const path = require('path');

const isImageExist = (value, { req }) => {
  if (!req.file) {
    throw new Error('Spice image required');
  }
  return true;
};

const isFileLessThan10MB = (value, { req }) => {
  if (req.file && req.file.size > 1024 * 1024 * 10) {
    throw new Error('Image size maximum is 10MB');
  }
  return true;
};

const isFileExtensionValid = (value, { req }) => {
  const fileExtension = path.extname(req.file.originalname);
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error('Only jpg, jpeg, and png images are allowed');
  }
  return true;
};

module.exports = {
  isImageExist,
  isFileExtensionValid,
  isFileLessThan10MB
};