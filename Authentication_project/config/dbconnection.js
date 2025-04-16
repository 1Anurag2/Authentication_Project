const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connect MongoDB
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connection Succeeded.');
    } catch (err) {
        console.error('❌ Error in DB connection:', err);
        process.exit(1); // exit app if connection fails
    }
};

module.exports = connectdb;
