import app from "./app";
import mongoConfig from "./config/db";
import socketConfig from "./config/socket";

// Connect to MongoDB. Done here to avoid calling in test suites when app is imported
mongoConfig();
// Setting up the web socket and web server
socketConfig(app);
