/**
 * Created by Alexandru Ionut Budisteanu - SkyHub on 6/9/2017.
 * (C) BIT TECHNOLOGIES
 */

import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from './../../config';

export function initializePassport(app){

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

  if (__DEV__) {
    app.enable('trust proxy');
  }

  app.get('/login/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
  );

  app.get('/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
    (req, res) => {
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
      res.redirect('/');
    },
  );


}
