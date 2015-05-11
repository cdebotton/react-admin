'use strict';
module.exports = function(sequelize, DataTypes) {
  var Permission = sequelize.define('Permission', {
    RoleId: DataTypes.INTEGER,
    controller: DataTypes.STRING,
    resourceId: DataTypes.INTEGER,
    create: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    destroy: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Permission.belongsTo(models.Role);
      }
    }
  });
  return Permission;
};
