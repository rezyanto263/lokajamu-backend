const { body, param } = require('express-validator');
const { isImageExist, isFileLessThan10MB, isFileExtensionValid } = require('../utils/imageValidationRule');
const db = require('../config/database');

const addRecipeValidation = [
  body('name')
    .notEmpty().withMessage('Recipe name is required')
    .isString().withMessage('Recipe name must be a string')
    .isLength({ max: 50 }).withMessage('Recipe name must not exceed 50 characters')
    .custom(async (value) => {
      try {
        const [recipeResults] = await db.query('SELECT name FROM recipes WHERE name = ?', [value]);
        const isRecipeNameExist = recipeResults.length > 0;

        if (isRecipeNameExist) throw new Error('VALIDATION_ERROR: This recipe name already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('VALIDATION_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating spice name');
        }
        throw err;
      }
    }),

  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),

  body('description')
    .notEmpty().withMessage('Recipe description is required')
    .isString().withMessage('Description must be a string'),

  body('image')
    .custom(isImageExist).bail().custom(isFileLessThan10MB).custom(isFileExtensionValid),

  body('ingredients.*.ingredient')
    .notEmpty().withMessage('Ingredient name is required')
    .isString().withMessage('Ingredient name must be a string'),

  body('ingredients.*.quantity')
    .notEmpty().withMessage('Ingredient quantity is required')
    .isString().withMessage('Ingredient quantity must be a string'),

  body('ingredients.*.notes').optional()
    .isString().withMessage('Notes must be a string'),

  body('steps.*.stepNumber')
    .notEmpty().withMessage('Step number is required')
    .isInt().withMessage('Step number must be an integer'),

  body('steps.*.instruction')
    .notEmpty().withMessage('Instruction is required')
    .isString().withMessage('Instruction must be a string'),

  body('prepTime')
    .notEmpty().withMessage('Preparation time is required')
    .isString().withMessage('Preparation time must be a string'),

  body('cookTime')
    .notEmpty().withMessage('Cooking time is required')
    .isString().withMessage('Cooking time must be a string'),

  body('servingSize')
    .notEmpty().withMessage('Serving size is required')
    .isString().withMessage('Serving size must be a string'),

  body('tips').optional()
    .isArray().withMessage('Tips must be an array'),
];

const editRecipeValidation = [
  param('id')
    .isNumeric().withMessage('Recipe id must be a number')
    .custom(async (value) => {
      try {
        const [recipeResults] = await db.query('SELECT id FROM recipes WHERE id = ?', [value]);
        const isRecipeIdExist = recipeResults.length > 0;

        if (!isRecipeIdExist) throw new Error('NOT_FOUND: Recipe id not found');

        return true;
      } catch (err) {
        if (!err.message.startsWith('NOT_FOUND')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating recipe id');
        }
        throw err;
      }
    }),

  body('name').optional()
    .isString().withMessage('Recipe name must be a string')
    .isLength({ max: 50 }).withMessage('Recipe name must not exceed 50 characters')
    .custom(async (value, { req }) => {
      try {
        const [recipeResults] = await db.query('SELECT id, name FROM recipes WHERE name = ?', [value]);
        const isRecipeNameExist = recipeResults.length > 0;
        const isRecipeIdSame = recipeResults[0].id === parseInt(req.params.id);

        if (isRecipeNameExist && !isRecipeIdSame) throw new Error('VALIDATION_ERROR: This recipe name already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('VALIDATION_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating recipe name');
        }
        throw err;
      }
    }),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('description').optional()
    .isString().withMessage('Description must be a string'),

  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true;
      return isFileLessThan10MB(value, { req }) && isFileExtensionValid(value, { req });
    }),

  body('ingredients.*.ingredient').optional()
    .isString().withMessage('Ingredient name must be a string'),

  body('ingredients.*.quantity').optional()
    .isString().withMessage('Ingredient quantity must be a string'),

  body('ingredients.*.notes').optional()
    .isString().withMessage('Notes must be a string'),

  body('steps.*.stepNumber').optional()
    .isInt().withMessage('Step number must be an integer'),

  body('steps.*.instruction').optional()
    .isString().withMessage('Instruction must be a string'),

  body('prepTime').optional()
    .isString().withMessage('Preparation time must be a string'),

  body('cookTime').optional()
    .isString().withMessage('Cooking time must be a string'),

  body('servingSize').optional()
    .isString().withMessage('Serving size must be a string'),

  body('tips').optional()
    .isArray().withMessage('Tips must be an array'),
];

module.exports = {
  addRecipeValidation,
  editRecipeValidation
};
