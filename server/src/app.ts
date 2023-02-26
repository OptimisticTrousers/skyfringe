import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import routes from "./routes/index";
import passportConfig from "./config/passport";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser())
passportConfig();

// routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

export default app;
