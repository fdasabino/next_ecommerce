import mongoose from "mongoose";

let connection;
// * connect to database
const connectDB = async () => {
    if (connection && mongoose.connection.readyState === 1) {
        console.log("Already connected to database...");
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

// * disconnect from database (only for production)
const disconnectDB = async () => {
    console.log("Not disconnected from database...");
};

const db = { connectDB, disconnectDB };
export default db;
