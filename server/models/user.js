const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: String,
  birthDate: Date,
  country: String,
  emailVerified: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'empty']
  },
  referedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserSchema' }]
});
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);
module.exports = {
  UserSchema,
  User,
  UserTC
};
