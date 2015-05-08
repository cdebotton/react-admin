"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Role.belongsToMany(models.User, {
          onDelete: "cascade",
          hooks: true,
          through: models.UserRole
        });
      }
    }
  });
  return Role;
};
