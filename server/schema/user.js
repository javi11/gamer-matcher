const { UserTC } = require('../models/user');

module.exports = (GQC) => {
  GQC.rootQuery().addFields({
    userById: UserTC.getResolver('findById').removeArg(['salt', 'password', 'emailVerified']),
    userByIds: UserTC.getResolver('findByIds').removeArg(['salt', 'password', 'emailVerified']),
    userOne: UserTC.getResolver('findOne').removeArg(['salt', 'password', 'emailVerified']),
    userMany: UserTC.getResolver('findMany').removeArg(['salt', 'password', 'emailVerified'])
  });

  GQC.rootMutation().addFields({
    userCreate: UserTC.getResolver('createOne').removeArg(['emailVerified', 'referedUsers', 'salt']),
    userUpdateById: UserTC.getResolver('updateById').removeArg(['emailVerified', 'referedUsers','password', 'salt'])
  });
}
