/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './client/App';
import Html from './client/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';

import router from './router';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './my-redux/store/configureStore';
import config from './config';

import { setRuntimeVariable } from './my-redux/actions/Runtime.actions';
import { newUserAuthenticated } from './my-redux/actions/UserAuthenticated.actions';

import {extractIP} from './my-redux/actions/Localization.actions';

var app = express();

import HTTPService from './client/services/Communication/http/Http.service';
import SocketWorker from './utils/socket-worker/SocketWorker';

//SocketWorker.startService();

// let SocketWorkerFile = require('./utils/socket-worker/SocketWorker');
// let SocketWorker = SocketWorkerFile.default.SocketWorker;

// let SocketClientFile = require('./client/services/Communication/socket/socket.service');
// let SocketClient = SocketClientFile.default.SocketService;
// SocketClient.startService(null);

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

import {initializePassport} from './utils/passport/PassportDefined.js';

initializePassport(app);



//
// Register API middleware
// -----------------------------------------------------------------------------


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {

    console.log("HELLO WORLD");

    const css = new Set();

    const initialState = {
      user: req.user || null,
      // userAuthenticated : defaultUserState, //Current User Authenticated
      // socketStatus : defaultSocketStatus, //Socket Status
      // localization : defaultLocalization, //Location
      // routerState : defaultRouterState, //Router Arguments
      // testReduxState : defaultTestReduxState,
    };


    const store = configureStore(initialState, {
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    if (req.path.indexOf("res/") === 1)
      return show404(app,req.path,res);

    //checking the cookie user
    if (req.headers.cookie){

      let cookieAnswer = await HTTPService.checkAuthCookie(req.headers.cookie);

      //console.log("COOOKIE ANSWER", cookieAnswer);

      //we have a registered user already in the cookie
      if ( (cookieAnswer.result||false) === true){
        store.dispatch(newUserAuthenticated(cookieAnswer.user));
      }
    }

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.status === 404)
      return show404(app,req.path,res);

    console.log("route::   ",req.path);
    console.log("cookie::   ", req.headers.cookie);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    store.dispatch(extractIP(req));

    // var sleep = require('sleep'); sleep.sleep(5); // sleep for ten seconds




    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [
      { id: 'css', cssText: [...css].join('') },
    ];
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});



function show404(app, path, res){
  let Error404 = require('./client/components/Template/404/404.js');
  Error404.show404(app, path, res);
}
