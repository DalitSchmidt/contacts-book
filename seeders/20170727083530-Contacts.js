'use strict';

let faker = require('faker')
let contacts = []

module.exports = {
    up: function(queryInterface, Sequelize) {
        for ( let i = 1; i <= 5000; i++ ) {
            contacts.push({
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                phone: faker.phone.phoneNumberFormat(),
                address: faker.address.streetAddress("#######") + ' ' + faker.address.stateAbbr(),
                email: faker.internet.email().toLowerCase(),
                createdAt: faker.date.recent().toISOString().slice(0, 19).replace('T', ' ')
            })
        }

        return queryInterface.bulkInsert('contacts', contacts, {});
    },

    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('contacts', null, {});
    },
};
