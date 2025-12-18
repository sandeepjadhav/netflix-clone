import 'dotenv/config'
import express from "express";
import cors from "cors";
import routes from "./routes.js";
import pinoHttp from "pino-http";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp());

app.use("/api", routes);

export default app;
