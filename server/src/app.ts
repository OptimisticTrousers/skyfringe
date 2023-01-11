import express, { Application } from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import { config } from "dotenv";
import routes from "./routes/index";
import mongoConfig from "./config/db";
import passportConfig from "./config/passport";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";

config();

const app: Application = express();

mongoConfig();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
passportConfig();

// routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(notFoundHandler);
// error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server running"));
