const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, { user, accessToken });
      } else {
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatarUrl: profile.photos[0].value,
          googleId: profile.id,
        });
        return done(null, { newUser, accessToken });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
