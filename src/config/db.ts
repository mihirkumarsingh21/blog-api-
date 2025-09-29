import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
    try {
        const mongodb_uri: string | undefined = process.env.MONGODB_URI as string;
        if (!mongodb_uri) {
            throw new Error("MONGODB_URI is not available in .env file");
        }

        await mongoose.connect(mongodb_uri);
        console.log("Database connected successfully.");

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // exit only if connection fails
    }
};
