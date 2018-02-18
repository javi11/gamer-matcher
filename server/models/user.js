const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);
module.exports = {
  UserSchema,
  User,
  UserTC
};
