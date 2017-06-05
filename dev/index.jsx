import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import responsive from '../stylus/responsive.styl';
import userlogin from '../stylus/userlogin.styl';
import fm from '../stylus/flightmanager.styl';
import appstyle from '../stylus/app.styl';
import reactdatetime from '../stylus/react-datetime.css';

const router = (
	<Provider store={store}>		
		<Router history={history}>
			<Route path="/" component={App} />
		</Router>
	</Provider>	
)

render(router, document.getElementsByTagName("flightApp")[0]); 