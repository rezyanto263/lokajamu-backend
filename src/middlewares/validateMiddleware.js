const { validationResult } = require('express-validator');

const validateMiddleware = (validationSchema) => [
  ...validationSchema,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => ({
        field: error.path,
        message: error.msg
      }));

      const dbError = errorMessages.find((error) => error.message.startsWith('DATABASE_ERROR'));
      if (dbError) {
        return res.status(500).json({
          status: 'error',
          message: 'Internal server error while validating data'
        });
      }

      const notFoundError = errorMessages.find((error) => error.message.startsWith('NOT_FOUND'));
      if (notFoundError) {
        return res.status(404).json({
          status: 'fail',
          message: notFoundError.message.replace('NOT_FOUND: ', ''),
        });
      }

      const conflictError = errorMessages.find((error) => error.message.startsWith('VALIDATION_ERROR'));
      if (conflictError) {
        return res.status(409).json({
          status: 'fail',
          message: conflictError.message.replace('VALIDATION_ERROR: ', ''),
        });
      }

      return res.status(400).json({
        status: 'fail',
        message: 'Data not valid',
        errors: errorMessages
      });
    }
    next();
  }
];


module.exports = validateMiddleware;