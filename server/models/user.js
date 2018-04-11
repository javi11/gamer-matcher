const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  salt: String,
  name: { type: String, select: false },
  email: { type: String, unique: true, required: true },
  avatar: String,
  password: { type: String, select: false, required: true },
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

UserSchema.pre('save', function saveFn(next) {
  this.salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, this.salt);
  return next();
});

const User = mongoose.model('User', UserSchema);

const UserTC = composeWithMongoose(User);

UserTC.removeField(['password', 'meta', 'emailVerified', 'provider', 'salt']);
module.exports = {
  UserSchema,
  User,
  UserTC
};
