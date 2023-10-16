import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import employeeRoutes from "./routes/EmployeeRoutes";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/employee-skills-db";

const app = express();
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.use("/api/v1/", employeeRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

export default app;
