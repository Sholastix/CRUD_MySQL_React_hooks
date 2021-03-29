const { Sequelize } = require('sequelize');

const { database } = require('../config/initializeDatabase');

// Create model for DB.
module.exports.Product = database.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },

    price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});