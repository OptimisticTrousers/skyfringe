import {
  clearMongoServer,
  initializeMongoServer,
  stopMongoServer,
} from "./mongoConfigTesting";

// Importing file that populates mock data for the database
import "./populateDB";

// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => initializeMongoServer());
afterAll(async () => {
  await clearMongoServer();
  await stopMongoServer();
});
