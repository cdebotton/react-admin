'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserRole = sequelize.define('UserRole', {
    UserId: DataTypes.INTEGER,
    RoleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        UserRole.belongsTo(models.User);
        UserRole.belongsTo(models.Role);
      }
    }
  });
  return UserRole;
};
