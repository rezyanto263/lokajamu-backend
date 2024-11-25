const jwt = require('jsonwebtoken');

const generateToken = (id, expiresIn) => {
  const payload = {
    id: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

module.exports = generateToken;
