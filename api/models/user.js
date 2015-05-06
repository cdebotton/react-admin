'use strict';

var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: function(value, next) {
        User.find({ where: { email: value }, attributes: ["id"] })
          .then(function(err, user) {
            if (err) {
              throw err;
            }
            if (user) {
              throw new Error("Email " + value + " already taken.");
            }

            next();
          });
      }
    },
    password: {
      type: DataTypes.STRING,
      set: function(v) {
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var hash = bcrypt.hashSync(v, salt);

        this.setDataValue("password", hash);
      }
    },
    lastLogin: DataTypes.DATE
  }, {
    instanceMethods: {
      verifyPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Token, {
          onDelete: "cascade",
          hooks: true
        });
        User.hasOne(models.Profile, {
          onDelete: "cascade",
          hooks: true
        });
      }
    }
  });
  return User;
};
