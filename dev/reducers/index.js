import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import changeAppData from './changeAppData';

const rootReducer = combineReducers({
	routing: routerReducer,
	database: changeAppData
});

export default rootReducer;