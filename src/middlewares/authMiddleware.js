const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ status: 'fail', message: 'No token provided!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ status: 'fail', message: 'Unauthorized' });

    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;