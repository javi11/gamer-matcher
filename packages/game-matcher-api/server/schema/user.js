const { UserTC } = require('../models/user');

module.exports = (GQC) => {
  GQC.rootQuery().addFields({
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany')
  });

  GQC.rootMutation().addFields({
    userCreate: UserTC.getResolver('createOne'),
    userUpdateById: UserTC.getResolver('updateById')
  });
}
