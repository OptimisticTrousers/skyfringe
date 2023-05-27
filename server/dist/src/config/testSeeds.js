"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoConfigTesting_1 = require("./mongoConfigTesting");
// Importing file that populates mock data for the database
const populateDB_1 = require("./populateDB");
// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConfigTesting_1.initializeMongoServer)();
    yield (0, populateDB_1.populate)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoConfigTesting_1.clearMongoServer)();
    yield (0, mongoConfigTesting_1.stopMongoServer)();
}));
