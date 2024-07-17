import mongoose from "mongoose";

const connectMongo = async () => {
  switch (mongoose.connection.readyState) {
    case 0:
      console.log("MongoDB is disconnected");
      break;
    case 1:
      console.log("MongoDB is connected");
      return; 
    case 2:
      console.log("MongoDB is connecting");
      break;
    case 3:
      console.log("MongoDB is disconnecting");
      return; 
    default:
      console.log("MongoDB connection state unknown");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Could not connect to MongoDB");
  }
};

const closeMongo = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

export { connectMongo,closeMongo };
