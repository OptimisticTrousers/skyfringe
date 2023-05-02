import {
  clearMongoServer,
  initializeMongoServer,
  stopMongoServer,
} from "./mongoConfigTesting";
// Importing file that populates mock data for the database
import { populate } from "./populateDB";

// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(async () => {
  await initializeMongoServer();
  await populate();
});
afterAll(async () => {
  await clearMongoServer();
  await stopMongoServer();
});
