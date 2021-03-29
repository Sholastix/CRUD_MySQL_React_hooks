require('dotenv').config()
const express = require('express');
const cors = require('cors');

require('./config/createDatabase')();
require('./config/initializeDatabase')();
const { database } = require('./config/initializeDatabase');
const productRoute = require('./routes/productRoute');

const app = express();
app.use(express.json());

app.use(cors());

app.use('/api', productRoute);

// Synchronization with DB, if success -> server starts.
(async function () {
    try {
        await database.sync();
        app.listen(process.env.APP_PORT, () => {
            console.log(`Server listening on port ${process.env.APP_PORT}.`);
        });
    } catch (err) {
        console.error(`Connection failed at port: ${process.env.APP_PORT}`, err);
    };
}());