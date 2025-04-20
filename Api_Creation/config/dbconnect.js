const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    console.log('MongoDB Connection Succeeded.');
  } catch (err) {
    console.error('Error in DB connection:', err.message);
  }
};

module.exports = connectDb;
