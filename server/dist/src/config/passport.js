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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_facebook_token_1 = __importDefault(require("passport-facebook-token"));
const passport_local_1 = require("passport-local");
const dotenv_1 = require("dotenv");
const user_1 = __importDefault(require("../models/user"));
const cookieExtractor_1 = __importDefault(require("../utils/cookieExtractor"));
(0, dotenv_1.config)();
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
const passportConfig = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: "email",
        passwordField: "password",
    }, (email, password, done) => {
        return user_1.default.findOne({ email })
            .then((user) => {
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            bcryptjs_1.default
                .compare(password, user.password)
                .then((res) => {
                if (res) {
                    // passwords match! log user in
                    return done(null, user);
                }
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" });
            })
                .catch(done);
        })
            .catch(done);
    }));
    passport_1.default.use("jwt", new JWTStrategy({
        jwtFromRequest: cookieExtractor_1.default,
        secretOrKey: process.env.JWT_SECRET,
    }, (jwtPayload, cb) => {
        // find the user in db if needed. This functionaity may be ommitted if you store everything you'll need in JWT payload.
        return user_1.default.findById(jwtPayload.id)
            .then((user) => {
            if (!user) {
                return cb(null, false);
            }
            return cb(null, user);
        })
            .catch(cb);
    }));
    const clientID = process.env.FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_APP_SECRET;
    if (!clientID) {
        throw new Error("FACEBOOK_APP_ID value is not defined in .env file");
    }
    if (!clientSecret) {
        throw new Error("FACEBOOK_APP_SECERT value is not defined in .env file");
    }
    passport_1.default.use(new passport_facebook_token_1.default({
        clientID,
        clientSecret,
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check for existing user in db
            const user = yield user_1.default.findOne({ facebookId: profile.id });
            if (user) {
                // user has logged into this app with FB before. Link with their account and log in
                return done(null, user);
            }
            else {
                // user has not logged into this app with FB before.
                // Set altText variable as FB does not provide any with profile pic
                // const altText = await generateAltText(profile.photos[0].value);
                const altText = "test";
                // Create a new User doc with their FB details
                const newUser = new user_1.default({
                    facebookId: profile.id,
                    fullName: profile.name,
                    userName: profile.name.givenName.toLowerCase(),
                    email: profile.emails[0].value,
                    // Image will always be available. Is set to anon img if FB profile has not changed. No alt text available for these unfortunately
                    photo: {
                        // only able to get imageURL, no altText available
                        imageUrl: profile.photos[0].value,
                        altText,
                    },
                });
                // Save new user account and pass to callback function to move to next middleware
                yield newUser.save();
                return done(null, newUser);
            }
        });
    }));
};
exports.default = passportConfig;
