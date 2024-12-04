const { body, param } = require('express-validator');
const { isImageExist, isFileLessThan10MB, isFileExtensionValid } = require('../utils/imageValidationRule');
const db = require('../config/database');

const addSpiceValidation = [
  body('name')
    .notEmpty().withMessage('Spice name required')
    .isString().withMessage('Spice name must be a string')
    .custom(async (value) => {
      try {
        const [spiceResults] = await db.query('SELECT name FROM spices WHERE name = ?', [value]);
        const isSpiceNameExist = spiceResults.length > 0;

        if (isSpiceNameExist) throw new Error('CONFLICT_ERROR: This spice name already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('CONFLICT_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating spice name');
        }
        throw err;
      }
    }),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('description')
    .notEmpty().withMessage('Spice description required')
    .isString().withMessage('Description must be a string'),

  body('benefits')
    .notEmpty().withMessage('Spice benefits required')
    .isString().withMessage('Benefits must be a string'),

  body('image')
    .custom(isImageExist).bail()
    .custom(isFileLessThan10MB).custom(isFileExtensionValid),
];

const editSpiceValidation = [
  param('id')
    .custom(async (value) => {
      try {
        if (isNaN(parseInt(value))) throw new Error('VALIDATION_ERROR: ID must be a number');
        const [spiceResults] = await db.query('SELECT id FROM spices WHERE id = ?', [value]);
        const isSpiceIdExist = spiceResults.length > 0;

        if (!isSpiceIdExist) throw new Error('NOT_FOUND_ERROR: Spice id not found');

        return true;
      } catch (err) {
        if (err.message.startsWith('VALIDATION_ERROR')) throw new Error(err.message.replace('VALIDATION_ERROR: ', ''));
        if (!err.message.startsWith('NOT_FOUND_ERROR') && !err.message.startsWith('VALIDATION_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating spice id');
        }
        throw err;
      }
    }),

  body('name').optional()
    .isString().withMessage('Spice name must be a string')
    .custom(async (value, { req }) => {
      try {
        const [spiceResults] = await db.query('SELECT id,name FROM spices WHERE name = ?', [value]);
        const isSpiceNameExist = spiceResults.length > 0;

        if (!isSpiceNameExist) return true;

        const isSpiceIdSame = spiceResults[0].id === parseInt(req.params.id);

        if (isSpiceNameExist && !isSpiceIdSame) throw new Error('CONFLICT_ERROR: This spice name already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('CONFLICT_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating spice name');
        }
        throw err;
      }
    }),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('description').optional()
    .isString().withMessage('Description must be a string'),

  body('benefits').optional()
    .isString().withMessage('Benefits must be a string'),

  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true;
      return isFileLessThan10MB(value, { req }) && isFileExtensionValid(value, { req });
    }),
];

module.exports = {
  addSpiceValidation,
  editSpiceValidation
};