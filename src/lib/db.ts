import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    console.log('Already connected to the database');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error: ', error);
    process.exit(1); // Shutdown the app on error
  }
};

export default connectDB;