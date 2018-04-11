const { composeWithRelay } = require('graphql-compose-relay');
const { composeWithConnection } = require('graphql-compose-connection');
const { UserTC } = require('../../models/user');
const { authenticatedAccess } = require('../middlewares/authorization');

// Composers
composeWithConnection(UserTC, {
  findResolverName: 'findMany',
  countResolverName: 'count'
});
composeWithRelay(UserTC);

module.exports = GQC => {
  GQC.rootQuery().addFields({
    ...authenticatedAccess({
      userById: UserTC.getResolver('findById').removeArg(['salt', 'password', 'emailVerified']),
      userByIds: UserTC.getResolver('findByIds').removeArg(['salt', 'password', 'emailVerified']),
      userOne: UserTC.getResolver('findOne').removeArg(['salt', 'password', 'emailVerified']),
      userMany: UserTC.getResolver('findMany').removeArg(['salt', 'password', 'emailVerified']),
      userConnection: UserTC.getResolver('connection'),
      userTotal: UserTC.getResolver('count')
    })
  });

  GQC.rootMutation().addFields({
    ...authenticatedAccess({
      userCreate: UserTC.getResolver('createOne').removeArg([
        'emailVerified',
        'referedUsers',
        'salt'
      ]),
      userUpdateById: UserTC.getResolver('updateById').removeArg([
        'record.emailVerified',
        'record.referedUsers',
        'record.password',
        'record.salt'
      ])
    })
  });
};
