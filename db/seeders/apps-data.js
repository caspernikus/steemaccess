'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('apps', [
      {
        client_id: 'steemaccess',
        secret: 'secretkey-abc-456',
        owner: 'moonrise',
        redirect_uris: JSON.stringify(['testapp://oauth/callback']),
        name: 'Steem Access',
        description: 'This is a test app.',
        icon: 'https://byteball.co/img/logo.jpg',
        website: 'https://example.com',
        beneficiaries: JSON.stringify([]),
        is_approved: true,
        is_public: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('apps', null, {});
  }
};
