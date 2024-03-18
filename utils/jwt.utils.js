const jwt = require('jsonwebtoken');

const secret = 'your_secret_key';

exports.generateToken = (userId) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
  return token;
};

exports.verifyToken = (token, callback) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, decoded);
    }
  });
};