const glob = require('glob');
const path = require('path');
const { GQC } = require('graphql-compose');
const { composeWithRelay } = require('graphql-compose-relay');

composeWithRelay(GQC.rootQuery());

const files = glob.sync(`${__dirname}/schemes/**/*.js`);
files.forEach(file => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const schema = require(path.resolve(file));

  return schema(GQC);
});

const graphqlSchema = GQC.buildSchema();

module.exports = graphqlSchema;
