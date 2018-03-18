const { Strategy, ExtractJwt } = require('passport-jwt');

module.exports = options => {
  const opts = {
    ...options,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  return new Strategy(opts, async ({ sub }, next) => {
    let user;
    try {
      user = await options.UserModel.findOne({ _id: sub });
    } catch (e) {
      return next(e, false);
    }

    if (!user) {
      return next(null, false);
    }

    return next(null, user);
  });
};
