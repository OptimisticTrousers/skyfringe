import express from "express";
import path from "path";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index";
import passportConfig from "./config/passport";
import notFoundHandler from "./middleware/notFoundHandler";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
passportConfig();

// routes
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

export default app;
