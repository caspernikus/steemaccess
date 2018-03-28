'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authorizations', [
      {
        client_id: 'steemaccess',
        user: 'moonrise',
        scope: JSON.stringify(['login',  'vote', 'custom_json']),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authorizations', null, {});
  }
};
