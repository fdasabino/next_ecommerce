import mongoose from "mongoose";

let connection;

// * connect to database
const connectDB = async () => {
  if (connection && mongoose.connection.readyState === 1) {
    console.log("Already connected to the database...");
    return;
  }

  try {
    connection = await mongoose.connect(process.env.NEXT_APP_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("New database connection...");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw new Error(error.message);
  }
};

connectDB();

// * disconnect from database (only for production)
const disconnectDB = async () => {
  if (connection && mongoose.connection.readyState === 1) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Not disconnected from the database...");
      return;
    }

    try {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log("Disconnected from the database...");
    } catch (error) {
      console.error("Database disconnection error:", error.message);
      throw new Error(error.message);
    }
  }
};

const db = { connectDB, disconnectDB };
export default db;
