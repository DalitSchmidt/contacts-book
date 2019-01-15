'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Contact', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            firstname: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    is: /^[A-Z][a-z]{1,10}$/i
                }
            },
            lastname: {
                allowNull: false,
                type: DataTypes.STRING,
                validate: {
                    is: /^[A-Z][a-z]{1,10}$/i
                }
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                isEmail: true,
                validate: {
                    is: /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/i
                },
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            }
        },
        {
            classMethods: {
                timestamps: false,
                associate: function(models) {
                    // associations can be defined here
                },
            },
        });
};