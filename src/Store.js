// eslint-disable-next-line
import { applyMiddleware, compose, createStore } from "redux";
import makeRootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./integration/rootSaga.js";

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];
  const enhancers = [];
  let store = "";

  // for dev - enables redux dev tools in development
  if (process.env.REACT_APP_REDUX_DEV_TOOLS === "true") {
    store = createStore(
      makeRootReducer(),
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true
      })(applyMiddleware(...middleware), ...enhancers)
    );
  } // for prod
  else {
    store = createStore(
      makeRootReducer(),
      initialState,
      compose(
        applyMiddleware(...middleware),
        ...enhancers
      )
    );
  }

  store.asyncReducers = {};
  sagaMiddleware.run(rootSaga);

  window.store = store;
  return { store };
};
