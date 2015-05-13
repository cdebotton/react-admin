'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.removeColumn("Permissions", "resourceId");
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.addColumn("Permissions", "resourceId", {
      type: Sequelize.INTEGER
    });
  }
};
