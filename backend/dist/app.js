import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Increase the payload size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use((req, res, next) => {
    res.cookie('cookieName', 'cookieValue', {
        sameSite: 'strict',
        secure: true,
        httpOnly: true
    });
    next();
});
app.use("/api", router);
const PORT = process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
    });
});
