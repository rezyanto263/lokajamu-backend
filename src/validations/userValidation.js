const { body, validationResult } = require('express-validator');
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
        const emailExist = results.length > 0;

        if (emailExist) throw new Error('This email already used');

        return value;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  body('password').trim()
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),

  body('confirmPassword').trim()
    .notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }));

      if (errorMessages.some((error) => error.message === 'Database error occured')) {
        return res.status(500).json({
          status: 'fail',
          message: 'Database error occured while checking email',
        });
      }

      if (errorMessages.some((error) => error.message === 'This email already used')) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already used',
          errors: errorMessages
        });
      }

      res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    } else {
      next();
    }
  }
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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }));

      res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    } else {
      next();
    }
  }
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
        const emailExist = results.length > 0;

        if (emailExist && results[0].id != req.userId) {
          throw new Error('This email already used');
        }

        return value;
      } catch (err) {
        throw new Error(err.message);
      }
    }),

  body('password').optional().trim()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain one uppercase letter, one lowercase letter, and one number.'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }));

      if (errorMessages.some((error) => error.message === 'Database error occured')) {
        return res.status(500).json({
          status: 'fail',
          message: 'Database error occured while checking email',
        });
      }

      if (errorMessages.some((error) => error.message === 'This email already used')) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already used',
          errors: errorMessages
        });
      }

      res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    } else {
      next();
    }
  }
];

const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ max: 255 }).withMessage('Email maximum 255 characters'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        message: 'This email not valid',
      });
    } else {
      next();
    }

  }
];

const resetCodeValidation = [
  body('resetToken')
    .notEmpty().withMessage('Reset code required')
    .isNumeric().withMessage('Please provide a reset code')
    .isLength({ min: 6, max: 6 }).withMessage('Reset token must be 6 digit'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        message: 'This reset code not valid',
      });
    } else {
      next();
    }
  }
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

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }));

      res.status(400).json({
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
  registerUserValidation,
  loginUserValidation,
  editUserValidation,
  forgotPasswordValidation,
  resetCodeValidation,
  changePasswordValidation
};