const express = require('express');
const router = express.Router();
const {
  registerUserValidation, loginUserValidation, editUserValidation,
  forgotPasswordValidation, resetCodeValidation, changePasswordValidation
} = require('../validations/userValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  register, login, getUserDetails, editUser, forgotPassword, verifyResetCode, changePassword
} = require('../controllers/userController');

router.post('/register', registerUserValidation, register);
router.post('/login', loginUserValidation, login);
router.get('/current', authMiddleware, getUserDetails);
router.put('/current', authMiddleware, editUserValidation, editUser);
router.post('/forgotpassword', forgotPasswordValidation, forgotPassword);
router.post('/resetcode', resetCodeValidation, verifyResetCode);
router.patch('/changepassword', authMiddleware, changePasswordValidation, changePassword);

module.exports = router;