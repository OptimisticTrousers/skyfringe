import passport from "passport";
import passportJWT from "passport-jwt";
import bcrypt from "bcryptjs";
import FacebookTokenStrategy from "passport-facebook-token";
import { Strategy as LocalStrategy } from "passport-local";
import { config } from "dotenv";
import User from "../models/user";
import cookieExtractor from "../middleware/cookieExtractor";

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
              .compare(password, user.password!)
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
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, cb) => {
        // find the user in db if needed. This functionaity may be ommitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
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

  const clientID = process.env.FACEBOOK_APP_ID;
  const clientSecret = process.env.FACEBOOK_APP_SECRET;
  if (!clientID) {
    throw new Error("FACEBOOK_API_ID value is not defined in .env file");
  }
  if (!clientSecret) {
    throw new Error("FACEBOOK_APP_SECERT value is not defined in .env file");
  }
  passport.use(
    new FacebookTokenStrategy(
      {
        clientID,
        clientSecret,
      },
      async function (accessToken, refreshToken, profile, done) {
        // Check for existing user in db
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
          // user has logged into this app with FB before. Link with their account and log in
          return done(null, user);
        } else {
          // user has not logged into this app with FB before.
          // Set altText variable as FB does not provide any with profile pic
          // const altText = await generateAltText(profile.photos[0].value);
          const altText = "test"

          // Create a new User doc with their FB details
          const newUser = new User({
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
          await newUser.save();
          return done(null, newUser);
        }
      }
    )
  );
};

export default passportConfig;
