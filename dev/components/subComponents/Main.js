import React, { Component } from 'react'
import { render } from 'react-dom'
import FlightManager from './FlightManager'

class Main extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	  		
	    };
    }

    render() {
    	return (
    		<div id="main-div-e1">
    			<FlightManager {...this.props} />
    		</div>
		);
    }
}

export default Main;