const { body, param } = require('express-validator');
const db = require('../config/database');
const { isImageExist, isFileLessThan10MB, isFileExtensionValid } = require('../utils/imageValidationRule');

const addArticleValidation = [
  body('title')
    .notEmpty().withMessage('Article title is required')
    .isString().withMessage('Article title must be a string')
    .isLength({ max: 50 }).withMessage('Article title must not exceed 50 characters')
    .custom(async (value) => {
      try {
        const [articleResults] = await db.query('SELECT title FROM articles WHERE title = ?', [value]);
        const isArticleTitleExist = articleResults.length > 0;

        if (isArticleTitleExist) throw new Error('CONFLICT_ERROR: This article title already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('CONFLICT_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating article title');
        }
        throw err;
      }
    }),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('image')
    .custom(isImageExist).bail().custom(isFileLessThan10MB).custom(isFileExtensionValid),

  body('contents.*.type')
    .notEmpty().withMessage('Content type is required')
    .isString().withMessage('Content type must be a string'),

  body('contents.*.text')
    .notEmpty().withMessage('Content text is required')
    .isString().withMessage('Content text must be a string'),
];

const editArticleValidation = [
  param('id')
    .isNumeric().withMessage('Article id must be a number')
    .custom(async (value) => {
      try {
        const [articleResults] = await db.query('SELECT id FROM articles WHERE id = ?', [value]);
        const isArticleIdExist = articleResults.length > 0;

        if (!isArticleIdExist) throw new Error('NOT_FOUND_ERROR: Article id not found');

        return true;
      } catch (err) {
        if (!err.message.startsWith('NOT_FOUND_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating article id');
        }
        throw err;
      }
    }),

  body('title').optional()
    .isString().withMessage('Article title must be a string')
    .isLength({ max: 50 }).withMessage('Article title must not exceed 50 characters')
    .custom(async (value, { req }) => {
      try {
        const [articleResults] = await db.query('SELECT id, title FROM articles WHERE title = ?', [value]);
        const isArticleTitleExist = articleResults.length > 0;

        if (!isArticleTitleExist) return true;

        const isArticleIdSame = articleResults[0].id === parseInt(req.params.id);

        if (isArticleTitleExist && !isArticleIdSame) throw new Error('CONFLICT_ERROR: This article title already exist');

        return true;
      } catch (err) {
        if (!err.message.startsWith('CONFLICT_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating article title');
        }
        throw err;
      }
    }),

  body('tags').optional()
    .isArray().withMessage('Tags must be an array'),

  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true;
      return isFileLessThan10MB(value, { req }) && isFileExtensionValid(value, { req });
    }),

  body('contents.*.type').optional()
    .isString().withMessage('Content type must be a string'),

  body('contents.*.text').optional()
    .isString().withMessage('Content text must be a string'),
];

module.exports = {
  addArticleValidation,
  editArticleValidation
};