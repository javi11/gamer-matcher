const jwt = require('jsonwebtoken');

function generateToken(userId, options) {
  const payload = {
    iss: options.iss,
    aud: options.aud,
    exp: Math.floor(Date.now() / 1000) + options.ttl,
    sub: userId,
    algorithm: options.alg
  };

  return jwt.sign(payload, options.secret);
}

module.exports = { generateToken };
