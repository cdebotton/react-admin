'use strict';
module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    key: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Token.belongsTo(models.User);
      }
    }
  });
  return Token;
};
