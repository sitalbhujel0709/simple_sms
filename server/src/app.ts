import express from "express";
import type {Express} from "express";
import router from "./routes";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser())


app.use("/api",router)


export default app;