'use strict';
module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    biography: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Profile.belongsTo(models.User);
      }
    }
  });
  return Profile;
};
