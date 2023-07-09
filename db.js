const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()
const DB_URL = process.env.DB_URL

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('🟢🟢 DB Connected Sire... 🟢🟢');
    } catch (error) {
        console.error('🚨🚨 ⛔ OH NO! DB Error ⛔ 🚨🚨:', error);
    }
};

module.exports = connectDB;