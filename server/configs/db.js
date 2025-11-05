import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to Mongo Db!");
    });

    const mongodbUri = process.env.MONGODB_URI;
    const projectName = "resumint-ai-builder";

    if (!mongodbUri) {
      throw new Error("MONGODB_URI env variable not set.");
    }

    if (mongodbUri.endsWith("/")) {
      mongodbUri = mongodbUri.slice(0, -1);
    }

    await mongoose.connect(`${mongodbUri}/${projectName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectDB;
