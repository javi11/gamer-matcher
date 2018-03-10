/* global Promise */

const fp = require('fastify-plugin');
const Mongoose = require('mongoose');

const { ObjectId } = Mongoose.Types;

function fastifyAuth(fastify, options, next) {
  const { uri, ...mongooseOptions } = options;

  Mongoose.Promise = Promise
  Mongoose.connect(uri, opt)
    .then(() => {
      const mongo = {
        db: Mongoose.connection,
        ObjectId
      }

      fastify
        .decorate('mongo', mongo)
        .addHook('onClose', (fastifyInstance, done) => fastifyInstance.mongo.db.close(done))

      return next()
    }, next)
}

module.exports = fp(fastifyMongoose, '>=0.29.0')
