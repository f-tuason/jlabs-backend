const mongoose = require('mongoose');
require('dotenv').config();

class MongoDB {
    constructor() {
        this.setupCloseListener();
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: process.env.DB_NAME,
                // useNewUrlParser: true,
                // useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error(err.message);
        }
    }

    setupCloseListener() {
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }
}

module.exports = new MongoDB;
