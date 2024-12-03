const { body } = require('express-validator');
const User = require('../models/userModel');

const registerUserValidation = [
  body('firstName')
    .notEmpty().withMessage('First name required')
    .isString().withMessage('First name must be string')
    .isLength({ max: 50 }).withMessage('First name maximum 50 characters'),

  body('lastName').optional()
    .isString().withMessage('Last name must be string')
    .isLength({ max: 50 }).withMessage('Last name maximum 50 characters'),

  body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ max: 255 }).withMessage('Email maximum 255 characters')
    .custom(async (value) => {
      try {
        const [results] = await User.getByEmail(value);
        const isEmailExist = results.length > 0;

        if (isEmailExist) throw new Error('VALIDATION_ERROR: This email already used');

        return true;
      } catch (err) {
        if (!err.message.startsWith('VALIDATION_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating user email');
        }
        throw err;
      }
    }),

  body('password').trim()
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),

  body('confirmPassword').trim()
    .notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.'),
];

const loginUserValidation = [
  body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ max: 255 }).withMessage('Email maximum 255 characters'),

  body('password').trim()
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),
];

const editUserValidation = [
  body('firstName')
    .notEmpty().withMessage('First name required')
    .isString().withMessage('First name must be a string')
    .isLength({ max: 50 }).withMessage('First name maximum 50 characters'),

  body('lastName').optional()
    .isString().withMessage('Last name must be string')
    .isLength({ max: 50 }).withMessage('Last name maximum 50 characters'),

  body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ max: 255 }).withMessage('Email maximum 255 characters')
    .custom(async (value, { req }) => {
      try {
        const [results] = await User.getByEmail(value);
        const isEmailExist = results.length > 0;
        const isUserIdSame = results[0].id == req.userId;

        if (isEmailExist && !isUserIdSame) throw new Error('VALIDATION_ERROR: This email already used');

        return true;
      } catch (err) {
        if (!err.message.startsWith('VALIDATION_ERROR')) {
          console.error('Database error:', err.message);
          throw new Error('DATABASE_ERROR: Database error occurred while validating user email');
        }
        throw err;
      }
    }),

  body('password').optional().trim()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),
];

const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ max: 255 }).withMessage('Email maximum 255 characters'),
];

const resetCodeValidation = [
  body('resetToken')
    .notEmpty().withMessage('Reset code required')
    .isNumeric().withMessage('Please provide a reset code')
    .isLength({ min: 6, max: 6 }).withMessage('Reset token must be 6 digit'),
];

const changePasswordValidation = [
  body('password').trim()
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),

  body('confirmPassword').trim()
    .notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.'),
];

module.exports = {
  registerUserValidation,
  loginUserValidation,
  editUserValidation,
  forgotPasswordValidation,
  resetCodeValidation,
  changePasswordValidation
};