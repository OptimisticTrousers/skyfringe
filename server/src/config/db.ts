import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

config();

const mongoConfig = () => {
  const mongoDB = process.env.DB_STRING;
  mongoose.connect(mongoDB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "mongo connection error"));
};

export default mongoConfig;