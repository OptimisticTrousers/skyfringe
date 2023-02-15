import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJWT from "passport-jwt";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const passportConfig = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        return User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }
            bcrypt
              .compare(password, user.password)
              .then((res: boolean) => {
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
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, cb) => {
        // find the user in db if needed. This functionaity may be ommitted if you store everything you'll need in JWT payload.
        return User.findOne(jwtPayload.id)
          .then((user) => {
            if (!user) {
              return cb(null, false);
            }
            return cb(null, user);
          })
          .catch(cb);
      }
    )
  );
};

export default passportConfig;
