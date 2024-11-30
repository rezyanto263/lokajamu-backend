const { body, param, validationResult } = require('express-validator');
const path = require('path');

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

const isImageExist = (value, { req }) => {
  if (!req.file) {
    throw new Error('Spice image required');
  }
  return true;
};

const addSpiceValidation = [
  body('name')
    .notEmpty().withMessage('Spice name required')
    .isString().withMessage('Spice name must be a string'),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('description')
    .notEmpty().withMessage('Spice description required')
    .isString().withMessage('Description must be a string'),

  body('benefits')
    .notEmpty().withMessage('Spice benefits required')
    .isString().withMessage('Benefits must be a string'),

  body('image')
    .custom(isImageExist).custom(isFileLessThan10MB).custom(isFileExtensionValid),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({ field: error.path, message: error.msg }));

      return res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    } else {
      next();
    }
  }
];

const editSpiceValidation = [
  param('id')
    .notEmpty().withMessage('Spice id required')
    .isNumeric().withMessage('Spice id must be a number'),

  body('name').optional()
    .isString().withMessage('Spice name must be a string'),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('description').optional()
    .isString().withMessage('Description must be a string'),

  body('benefits').optional()
    .isString().withMessage('Benefits must be a string'),

  body('image').optional()
    .custom(isFileLessThan10MB).custom(isFileExtensionValid),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({ field: error.path, message: error.msg }));

      return res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    } else {
      next();
    }
  }
];

module.exports = {
  addSpiceValidation,
  editSpiceValidation
};