const { Sequelize } = require('sequelize');

module.exports = async () => {
    try {
        const database = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            define: {
                timestamps: false,
            },
        });
        module.exports = { database }
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};