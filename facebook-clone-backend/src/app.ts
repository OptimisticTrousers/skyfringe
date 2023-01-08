import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Response,
  Request,
} from "express";
import path from "path";
import logger from "morgan";
import createError from "http-errors";
import cors from "cors";
import { config } from "dotenv";
import mongoose, { ConnectOptions, Error } from "mongoose";
import routes from "./routes/index";

config();

const app: Application = express();

const mongoDB = process.env.DB_STRING;
mongoose.connect(mongoDB!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api", routes);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use(<ErrorRequestHandler>((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send back an error
  res.status(err.status || 500).send(err);
}));

app.listen(5000, () => console.log("Server running"));
