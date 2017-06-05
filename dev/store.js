import { applyMiddleware, createStore, compse } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
//import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import rootReducer from './reducers/index';

//const middleware = applyMiddleware(promise(), thunk, logger())
const middleware = applyMiddleware(promise(), thunk)
const store = createStore(rootReducer, middleware)

export const history = syncHistoryWithStore(hashHistory, store);

export default store;