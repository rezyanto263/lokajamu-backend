const { google } = require('googleapis');

// OAuth2 Configuration
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  // eslint-disable-next-line camelcase
  refresh_token: REFRESH_TOKEN
});

module.exports = oAuth2Client;