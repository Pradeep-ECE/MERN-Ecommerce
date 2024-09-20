const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;
  opts.passReqToCallback = true;
  passport.use(new JwtStrategy(opts, async function (req,jwt_payload, done) {
    if (jwt_payload && ((isNaN(req?.params?.storeId) || !req?.params?.storeId || !(jwt_payload?.storeId || jwt_payload?.store?.id)) ||
      ((jwt_payload?.store?.id || jwt_payload?.storeId) == (!isNaN(req?.params?.storeId) && +req?.params?.storeId)))) {
      return done(null, jwt_payload);
    } else {
      return done(null, false);
    }
  }));
}