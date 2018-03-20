/* global Promise */

const fp = require('fastify-plugin');
const { renderPlaygroundPage } = require('graphql-playground-html');

// Graphql playground for development
function fastifyPlayGround(fastify, options, done) {
  fastify.get('/playground', (request, reply) => {
    reply.type('text/html').send(renderPlaygroundPage({ endpoint: '/graphql', version: '1.4.3' }));
  });

  return done();
}

module.exports = fp(fastifyPlayGround);
