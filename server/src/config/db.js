import mongoose from "mongoose";

export const connectDB = async (mongoURI) => {
    try {
        await mongoose
            .connect(mongoURI)
            .then(() => {
                console.log("Connected to MongoDB!");
            })
            .catch((e) => {
                console.log("Failed to connect to MongoDB!", e);
            });
    } catch (e) {
        console.error("An error occurred while connecting to MongoDB:", e);
        process.exit(1);
    }
};
