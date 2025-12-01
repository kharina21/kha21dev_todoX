import express from "express";
import { router } from "./routes/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());
app.use(express.json());

router(app);

connectDB(process.env.MONGO_URI).then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
