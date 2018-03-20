const { createError } = require('apollo-errors');

module.exports.AuthorizationError = createError('AuthorizationError', {
  message: 'You are not authorized',
  options: {
    showPath: true,
    showLocations: true
  }
});
