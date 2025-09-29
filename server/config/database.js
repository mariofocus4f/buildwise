const mongoose = require('mongoose');

const connectDB = async () => {
  // Skip database connection if MONGODB_URI is not set
  if (!process.env.MONGODB_URI) {
    console.log('⚠️ MONGODB_URI not set - running without database');
    console.log('⚠️ Add MONGODB_URI environment variable to enable database features');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('⚠️ Continuing without database - some features may not work');
    // Don't exit - allow app to run without database
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔒 MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;

