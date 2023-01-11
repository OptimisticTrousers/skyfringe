import { config } from "dotenv";
import app from "./app";
import mongoConfig from "./config/db";
import notFoundHandler from "./middleware/notFoundHandler";

config();

const port = process.env.PORT || 5000;

// Connect to MongoDB. Done here to avoid calling in test suites when app is imported
mongoConfig();

// catch 404 and forward to error handler because the new routes defined in testing will not work
app.use(notFoundHandler);

// Server will look for env variable PORT; if not available, will default to 3000
app.listen(port, () => console.log("Server running"));
