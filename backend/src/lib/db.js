import mongoose from "mongoose";


export const connectDB = async () => {
    try {
      const  connect =  await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfully ${connect.connection.host}`);
    } catch (error) {
        console.error("Database connection failed", error);
    }
};


