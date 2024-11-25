const nodemailer = require('nodemailer');
const oAuth2Client = require('../config/email');

const { GMAIL_USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

// Generate Access Token
const accessToken = async () => {
  return await oAuth2Client.getAccessToken();
};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: GMAIL_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken.token,
  },
});

module.exports = transporter;