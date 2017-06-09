/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

//
// Authentication
// -----------------------------------------------------------------------------
app.use(expressJwt({
  secret: config.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
// Error handler for express-jwt
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(passport.initialize());
