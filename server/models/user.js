const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  password: {
    type: String,
    select: false
  },
  birthDate: Date,
  country: String,
  emailVerified: {
    type: Boolean,
    default: false,
    select: false
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'empty']
  },
  referedUsers: [{ type: Schema.Types.ObjectId, ref: 'UserSchema' }],
  provider: {
    type: String,
    select: false
  },
  meta: {
    id: {
      type: String,
      select: false
    },
    token: {
      type: String,
      select: false
    }
  }
});
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);
const UserTC = composeWithMongoose(User);
UserTC.removeField(['password', 'meta', 'emailVerified', 'provider']);
module.exports = {
  UserSchema,
  User,
  UserTC
};
