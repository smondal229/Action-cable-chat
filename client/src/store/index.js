import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from '../reducers';
import socketMiddleware from '../middlewares/websocket';

const middlewares = process.env.NODE_ENV === 'development' ? [thunk, logger] : [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middlewares, socketMiddleware)
);

export default store;
