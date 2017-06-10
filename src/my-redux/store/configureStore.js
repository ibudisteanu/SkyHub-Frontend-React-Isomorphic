import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import createHelpers from './createHelpers';
import createLogger from './logger/logger.server';

import AsyncMiddleware from './async-middleware/AsyncMiddleware';

import {defaultUserState} from "../reducers/UserAuthenticated.reducer";
import {defaultSocketStatus} from "../reducers/SocketStatus.reducer";
import {defaultLocalization} from "../reducers/Localization.reducer";
import {defaultRouterState} from "../reducers/RouterState.reducer";
import {defaultTestReduxState} from "../test-redux/reducers/TestRedux.reducer";

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());
    //middleware.push(AsyncMiddleware());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
    );
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  //Initial Redux Store State
  initialState.userAuthenticated = defaultUserState; //Current User Authenticated
  initialState.socketStatus = defaultSocketStatus; //Socket Status
  initialState.localization = defaultLocalization; //Location
  initialState.routerState = defaultRouterState; //Router Arguments

  initialState.testReduxState = defaultTestReduxState;

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers/index').default),
    );
  }

  return store;
}
