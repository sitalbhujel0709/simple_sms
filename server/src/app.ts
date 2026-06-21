import express from "express";
import type {Express} from "express";
import router from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api",router)

export default app;