import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";

config();

const mongoConfig = () => {
  const mongoDb = process.env.DB_STRING;
  if (!mongoDb) {
    throw new Error("DB_STRING value is not defined in .env file");
  }
  mongoose.connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "mongo connection error"));
};

export default mongoConfig;
