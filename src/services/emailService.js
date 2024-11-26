const nodemailer = require('nodemailer');
const oAuth2Client = require('../config/email');

const { GMAIL_USER, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const getAccessToken = async () => {
  try {
    const token = await oAuth2Client.getAccessToken();
    return token.token;
  } catch (error) {
    console.error('Error obtaining access token', error);
    throw new Error('Failed to generate access token');
  }
};

const sendEmail = async (options) => {
  try {
    const accessToken = await getAccessToken();

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

    const info = await transporter.sendMail(options);
    return info;
  } catch (error) {
    console.error('Error sending email', error);
    throw error;
  }
};

module.exports = sendEmail;