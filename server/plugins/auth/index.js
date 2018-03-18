/* global Promise */

const fp = require('fastify-plugin');
const passport = require('passport');
const { unauthorized } = require('boom');
const Auth = require('./auth');
const jwtStrategy = require('./strategies/jwt');

function fastifyAuth(fastify, options, done) {
  const secret = process.env.JWT_SECRET || 'S3CR3T';

  passport.use(
    jwtStrategy({
      secretOrKey: secret,
      issuer: options.issuer,
      audience: options.audience,
      UserModel: options.UserModel
    })
  );

  const authInstance = new Auth({
    alg: 'HS256',
    ...options,
    secret
  });

  fastify.use(passport.initialize());
  // Encapsulate passport auth error to continue with the request to graphql endpoint even if the user is not authenticated
  fastify.use('/graphql', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err || !user) {
        req.log.debug('Session not found', err);
      } else {
        Object.assign(req, { user });
      }

      return next();
    })(req, res);
  });

  fastify.decorateRequest('user', function requestFn() {
    return this.req.user;
  });

  fastify.post('/oauth2/token', async (req, res) => {
    let response;
    try {
      response = await authInstance.authenticate(req.body);
      res.code(200).send(response);
    } catch (e) {
      if (e.statusCode && e.statusCode === 401) {
        req.log.debug(e);
      } else {
        req.log.error(e);
      }

      res.code(401).send(unauthorized());
    }
  });

  return done();
}

module.exports = fp(fastifyAuth);
