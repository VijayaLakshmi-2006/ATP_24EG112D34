import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import EmployeeApp from "./API/EmployeeAPI.js";
import cors from "cors";


const app = express();

// add cors
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/employees', EmployeeApp);

// Database Connection & Server Start
const connectDB = async () => {
    try {
        const dbUrl = process.env.DB_URL;
        if (!dbUrl || dbUrl.includes("<db_password>")) {
            throw new Error("Missing or invalid DB_URL in .env. Please replace '<db_password>' with your actual password.");
        }
        await mongoose.connect(dbUrl);
        console.log("✅ Database connected successfully");
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1);
    }
}

connectDB();

export { };
