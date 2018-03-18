const { AuthorizationError } = require('../errors');

function authenticatedAccess(resolvers) {
  Object.keys(resolvers).forEach(k => {
    const resolver = resolvers[k].wrapResolve(next => rp => {
      if (!rp.context.user) {
        throw new AuthorizationError();
      }

      return next(rp);
    });

    Object.assign(resolvers, { [k]: resolver });
  });
  return resolvers;
}

module.exports = {
  authenticatedAccess
};
