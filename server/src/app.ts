import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";
import routes from "./routes/index";
import passportConfig from "./config/passport";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";

config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
passportConfig();


// routes
app.use("/api", routes);

// error handler
app.use(errorHandler);

export default app;
