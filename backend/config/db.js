require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connection SUCCESS')
    } catch {
        console.log('Connection FAIL');
        process.exit(1);
    }
}


module.exports = connectDB;