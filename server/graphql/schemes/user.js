const { UserTC } = require('../../models/user');
const { authenticatedAccess } = require('../middlewares/authorization');

module.exports = GQC => {
  GQC.rootQuery().addFields({
    ...authenticatedAccess({
      userById: UserTC.getResolver('findById'),
      userByIds: UserTC.getResolver('findByIds'),
      userOne: UserTC.getResolver('findOne'),
      userMany: UserTC.getResolver('findMany')
    })
  });

  GQC.rootMutation().addFields({
    ...authenticatedAccess({
      userCreate: UserTC.getResolver('createOne'),
      userUpdateById: UserTC.getResolver('updateById')
    })
  });
};
