'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('metadata', [
      {
        client_id: 'steemaccess',
        user: 'moonrise',
        user_metadata: JSON.stringify({
          locale: 'de',
          color: 'blue',
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('metadata', null, {});
  }
};
