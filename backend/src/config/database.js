const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is missing');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('⚠️ The provided MongoDB credentials appear to be invalid.');
    console.error('🔧 Please verify:');
    console.error('   1. Username and password are correct');
    console.error('   2. Database user has proper permissions');
    console.error('   3. IP address is whitelisted in MongoDB Atlas');
    console.error('   4. Network connectivity to MongoDB Atlas');
    console.error('');
    console.error('🚀 Server will continue running without database connection.');
    console.error('📝 Database operations will fail until connection is restored.');
  }
};

module.exports = connectDB;
