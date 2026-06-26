import express from "express";
import type {Express} from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api",router)


export default app;