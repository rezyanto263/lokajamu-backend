const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../config/jwt');
const moment = require('moment');
const crypto = require('crypto');
const sendEmail = require('../services/emailService');

const register = async (req, res) => {
  try {
    const { firstName, lastName = null, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [results] = await User.add({ firstName, lastName, email, hashedPassword });

    res.status(201).json({ status: 'success', message: 'Register account success!', data: { userId: results.insertId } });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Register account failed!' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [results] = await User.getByEmail(email);

    if (results.length === 0) return res.status(401).json({ status: 'fail', message: 'Wrong email or password!' });

    const isPasswordValid = bcrypt.compareSync(password, results[0].password);

    if (!isPasswordValid) return res.status(401).json({ status: 'fail', message: 'Wrong email or password!' });

    const token = generateToken(results[0].id, '1h');

    res.json({
      status: 'success',
      data: { token }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Login account failed!' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const id = req.userId;
    const [results] = await User.getById(id);

    if (results.length === 0) return res.status(404).json({ status: 'fail', message: 'Account not found!' });

    const { firstName, lastName, email, createdAt, updatedAt } = results[0];

    res.json({
      status: 'success',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
        updatedAt: moment(updatedAt).format('DD-MM-YYYY HH:mm:ss')
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Get account failed!' });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.userId;

    const { firstName, lastName, email } = req.body;

    const [editResults] = await User.edit(firstName, (lastName === '' ? null : lastName), email, id);

    if (editResults.affectedRows === 0) return res.status(401).json({ status: 'fail', message: 'Unauthorized!' });

    res.json({
      status: 'success',
      message: 'Account edited successfully'
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Edit account failed!' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const [results] = await User.getByEmail(email);
    const isUserExist = results[0];

    if (!isUserExist) return res.status(401).json({ status: 'fail', message: 'Unauthorized!' });

    const resetToken = crypto.randomInt(100000, 999999);

    const mailOptions = {
      from: `Loka Jamu App<${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Reset your Loka Jamu account password',
      text: `RESET TOKEN: ${resetToken}`,
    };

    const result = await sendEmail(mailOptions);

    const resetTokenExpire = moment().add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss');

    if (result) {
      await User.addResetToken(email, resetToken, resetTokenExpire);
    }

    res.json({
      status: 'success',
      message: 'The reset token has sent to the email!',
      data: {
        resetTokenExpire: moment(resetTokenExpire).format('DD-MM-YYYY HH:mm:ss')
      }
    });
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Forgot password failed!' });
  }
};

const verifyResetToken = async (req, res) => {
  try {
    const [results] = await User.getResetToken(req.body.email, req.body.resetToken);
    const { id, resetToken, resetTokenExpire } = results[0];

    if (!resetToken) return res.status(401).json({ status: 'fail', message: 'Unauthorized!' });

    const dateTimeNow = moment();
    const expireTime = moment(resetTokenExpire);

    if (dateTimeNow.isBefore(expireTime)) {
      const token = generateToken(id, '15m');
      res.json({
        status: 'success',
        message: 'The reset token has been verified',
        data: {
          token: token
        }
      });
    } else {
      res.status(401).json({ status: 'fail', message: 'Unauthorized!' });
    }
  } catch (err) {
    console.error(`Error occured: ${err.message}`);
    res.status(500).json({ status: 'fail', message: 'Verify reset token failed!' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.changePassword(req.userId, hashedPassword);

    res.json({
      status: 'success',
      message: 'Password updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: 'fail', message: 'Change password failed!' });
  }
};

module.exports = {
  register,
  login,
  getUserDetails,
  editUser,
  forgotPassword,
  verifyResetToken,
  changePassword,
};