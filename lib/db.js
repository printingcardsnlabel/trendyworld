const mongoose = require('mongoose');
const path = require('path');
// সরাসরি মেইন ফোল্ডার থেকে .env ফাইলটি খুঁজে বের করবে


const connectDB = async () => {
    // এটি চেক করার জন্য কনসোল লগ দিন
    console.log("Checking URI:", process.env.MONGO_URL); 

    if (!process.env.MONGO_URL) {
        console.error("❌ Error: MONGO_URL is not defined in .env file!");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('✅ MongoDB Connected successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
    }
}

module.exports = connectDB;