import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from "./config/db.js";
import router from "./routes/index.js";


dotenv.config();
const app: Express = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`now listening on port ${PORT}`);
    });
});
