const fastify = require('fastify')({ logger: true });
const { graphqlFastify } = require('fastify-graphql');
const { formatError } = require('apollo-errors');
const fastifyBoom = require('fastify-boom');
const fastifyMongoose = require('./plugins/mongoose');
const auth = require('./plugins/auth/index');
const playground = require('./plugins/playground');
const schema = require('./graphql/schema');
const config = require('./config/config.json');
const { User } = require('./models/user');

const isProduction = process.env.NODE_ENV === 'production';

fastify.register(
  fastifyMongoose,
  {
    uri: `mongodb://${process.env.IP || 'localhost'}/gamer-matcher`
  },
  err => {
    if (err) throw err;
  }
);

fastify.register(fastifyBoom);
fastify.register(auth, { ...config.auth, UserModel: User });
fastify.register(graphqlFastify, {
  prefix: '/graphql',
  graphql: req => ({
    formatError,
    schema,
    tracing: !isProduction,
    context: {
      user: req.user()
    }
  })
});

if (!isProduction) {
  fastify.register(playground);
}

fastify.listen(process.env.PORT || 8080, '0.0.0.0', err => {
  if (err) {
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`server listening on ${fastify.server.address().port}`);
});
