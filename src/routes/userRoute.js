const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const {
  registerUserValidation, loginUserValidation, editUserValidation,
  forgotPasswordValidation, resetCodeValidation, changePasswordValidation
} = require('../validations/userValidation');
const {
  register, login, getUserDetails, editUser, forgotPassword, changePassword,
  verifyResetToken
} = require('../controllers/userController');

router.post('/register', validateMiddleware(registerUserValidation), register);
router.post('/login', validateMiddleware(loginUserValidation), login);
router.get('/current', authMiddleware, getUserDetails);
router.put('/current', authMiddleware, validateMiddleware(editUserValidation), editUser);
router.post('/forgotpassword', validateMiddleware(forgotPasswordValidation), forgotPassword);
router.post('/resettoken', validateMiddleware(resetCodeValidation), verifyResetToken);
router.patch('/changepassword', authMiddleware, validateMiddleware(changePasswordValidation), changePassword);

module.exports = router;