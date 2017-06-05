import React, { Component } from 'react';
var Datetime = require('react-datetime');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';
import UserLogin from './UserLogin';

class FlightManager extends Component {

	constructor(props) {
	    super(props);
        this.handleFlightData = this.handleFlightData.bind(this);
        this.enterForm = this.enterForm.bind(this);
        this.searchFlights = this.searchFlights.bind(this);
        this.editFlight = this.editFlight.bind(this);
        this.updateFlight = this.updateFlight.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
        this.bookFlight = this.bookFlight.bind(this);
        this.handleBookFlight = this.handleBookFlight.bind(this);

	    this.state = {
            flightCreated: this.props.store.database.flightCreated,
            flightUpdated: this.props.store.database.flightUpdated,
	  		flightDeleted: this.props.store.database.flightDeleted,
            results: this.props.store.database.results,
            bookIndex: this.props.store.database.results,
            booked: this.props.store.database.booked,
            user: this.props.store.database.user,
            editId: this.props.store.database.editId,
            bookClick: false
	    };
    }

    componentWillReceiveProps(nextProps) {
        const flightCreated = nextProps.store.database.flightCreated,
              flightUpdated = nextProps.store.database.flightUpdated,
              flightDeleted = nextProps.store.database.flightDeleted,
              results = nextProps.store.database.results,
              editId = nextProps.store.database.editId,
              booked = nextProps.store.database.booked,
              bookIndex = nextProps.store.database.bookIndex,
              user = nextProps.store.database.user;

        this.setState({
            flightCreated,
            flightUpdated,
            flightDeleted,
            results,
            booked,
            bookIndex,
            user,
            editId
        });
    }

    enterForm (event) {
        event.preventDefault();

        if (typeof this.state.flightCreated === 'number') {
            this.props.createFlight('initial');
        }

        this.props.unsetDeleteFlight(false);
        this.props.unsetUpdateFlight(false);
    }

    deleteFlight (event) {
        event.preventDefault();

        let flightData = {
            id: this.state.editId
        }

        this.props.deleteFlightData(flightData);
    }

    bookFlight (event) {
        let bookIndex = Number(event.target.id.split('_')[1]);

        this.props.updateBookIndex(bookIndex);
    }

    handleBookFlight (event) {
         event.preventDefault();

        let bookingData = {
            name: this.refs.customer_name.value,
            email: this.refs.customer_email.value,
            pax: this.refs.pax_number.value,
            payment: this.refs.payment.value,
            flight_id: this.state.results[this.state.bookIndex].id
        }

        setTimeout(() => {
            this.setState({
                bookClick: true
            });
        }, 2000);

        this.props.book(bookingData);
    }

    updateFlight (event) {
        event.preventDefault();
        
        let flightData = {
            origin: this.refs.f_origin.value,
            destination: this.refs.f_destination.value,
            departure: document.getElementById('depDate').value,
            arrival: document.getElementById('arrDate').value,
            airline: this.refs.f_airline.value,
            aircraft: this.refs.f_aircraft.value,
            flightnumber: this.refs.f_flightnumber.value,
            availability: this.refs.f_availability.value,
            priceperpax: this.refs.f_priceperpax.value,
            id: this.state.editId
        }

        this.props.updateFlightData(flightData);
    }

    searchFlights (event) {
        event.preventDefault();

        let flightData = {
            origin: this.refs.f_origin.value,
            destination: this.refs.f_destination.value,
            departure: document.getElementById('depDate').value,
            arrival: document.getElementById('arrDate').value,
            airline: this.refs.f_airline.value,
            aircraft: this.refs.f_aircraft.value,
            flightnumber: this.refs.f_flightnumber.value,
            availability: this.refs.f_availability.value,
            priceperpax: this.refs.f_priceperpax.value
        }

        this.props.searchFlights(flightData);
    }

    editFlight (event) {
        let resultIndex = Number(event.target.id.split('_')[1]),
            result = this.state.results[resultIndex],
            departure = result.departure_date + ' ' + result.departure_time,
            arrival = result.arrival_date + ' ' + result.arrival_time;

        this.refs.f_origin.value = result.origin;
        this.refs.f_destination.value = result.destination;
        document.getElementById('depDate').value = departure;
        document.getElementById('arrDate').value = arrival;
        this.refs.f_airline.value = result.airline;
        this.refs.f_aircraft.value = result.aircraft;
        this.refs.f_flightnumber.value = result.flight_number;
        this.refs.f_availability.value = result.availability;
        this.refs.f_priceperpax.value = result.price_per_pax;

        this.props.updateEditId(result.id);
                      
        scroll(0,0);
    }

    handleFlightData (event) {
        event.preventDefault();

        let flightData = {
            origin: this.refs.f_origin.value,
            destination: this.refs.f_destination.value,
            departure: document.getElementById('depDate').value,
            arrival: document.getElementById('arrDate').value,
            airline: this.refs.f_airline.value,
            aircraft: this.refs.f_aircraft.value,
            flightnumber: this.refs.f_flightnumber.value,
            availability: this.refs.f_availability.value,
            priceperpax: this.refs.f_priceperpax.value
        }

        this.props.processFlightData(flightData);
    }

    render() {
        let flightCreated = this.state.flightCreated,
            condition = flightCreated === 1 && typeof flightCreated === 'number',
            uncondition = flightCreated === 0 && typeof flightCreated === 'number',
            conditionExists = flightCreated === 2 && typeof flightCreated === 'number',
            results = this.state.results,
            resultsCondition = results !== undefined && results.length > 0,
            resultsUncondition = results !== undefined && results.length === 0;

        const user = this.state.user;

        return (
    		<div id="fm-div-e1">
                <div className="col-sm-12"></div>
                <UserLogin {...this.props}/>
                <div id="fm-div-e2" className="col-sm-12">
                    Flight Manager
                </div>
    			<form onSubmit={(event) => this.handleFlightData(event)}>
                    <div className="col-sm-2"></div>
                    <div id="fm-div-form-e1" className="col-sm-8 inputlist">
                        <div id="fm-div-form-e2">
                            <label htmlFor="f_origin" className="inputlist-label">
                                <span className="inputlist-span">
                                    Origin
                                </span>
                                <input type="text" title="Enter flight origin" ref="f_origin" onFocus={(e) => this.enterForm(e)}
                                       className="inputlist-field" id="f_origin" name="f_origin" placeholder="Origin" required/>
                            </label>
                            <label htmlFor="f_destination" className="inputlist-label">
                                <span className="inputlist-span">
                                    Destination
                                </span>
                                <input required ref="f_destination" type="text"  title="Enter flight destination"
                                       className="inputlist-field" id="f_destination" name="f_destination" placeholder="Destination" />
                            </label>
                            <label htmlFor="f_departure_date" className="inputlist-label">
                                <span className="inputlist-span">
                                    Departure
                                </span>
                                <Datetime className="datetime" inputProps={{id: 'depDate', placeholder: 'Departure date', required: true}} timeFormat="HH:mm"/>
                            </label>
                            <label htmlFor="f_arrival_date" className="inputlist-label">
                                <span className="inputlist-span">
                                    Arrival
                                </span>
                                <Datetime className="datetime" inputProps={{id: 'arrDate', placeholder: 'Arrival date', required:true}} timeFormat="HH:mm"/>
                            </label>
                            <label htmlFor="f_airline" className="inputlist-label">
                                <span className="inputlist-span">
                                    Airline
                                </span>
                                <input required ref="f_airline" type="text"  title="Enter airline"
                                       className="inputlist-field" id="f_airline" name="f_airline" placeholder="Airline" />
                            </label>
                            <label htmlFor="f_aircraft" className="inputlist-label">
                                <span className="inputlist-span">
                                    Aircraft
                                </span>
                                <input required ref="f_aircraft" type="text"  title="Enter aircraft"
                                       className="inputlist-field" id="f_aircraft" name="f_aircraft" placeholder="Aircraft" />
                            </label>
                            <label htmlFor="f_flightnumber" className="inputlist-label">
                                <span className="inputlist-span">
                                    Flight-Number
                                </span>
                                <input required ref="f_flightnumber" type="text"  title="Enter flight number"
                                       className="inputlist-field" id="f_flightnumber" name="f_flightnumber" placeholder="Flight-Number" />
                            </label>
                            <label htmlFor="f_availability" className="inputlist-label">
                                <span className="inputlist-span">
                                    Availability (free seats)
                                </span>
                                <input required ref="f_availability" type="text"  title="Enter availability"
                                       className="inputlist-field" id="f_availability" name="f_availability" placeholder="Availability" />
                            </label>
                            <label htmlFor="f_priceperpax" className="inputlist-label">
                                <span className="inputlist-span">
                                    Price (per pax)
                                </span>
                                <input required ref="f_priceperpax" type="text"  title="Enter price per pax"
                                       className="inputlist-field" id="f_priceperpax" name="f_priceperpax" placeholder="Price per pax" />
                            </label>

                        </div>                 
                    </div>
                    <div className="col-sm-2"></div>

                    {condition && 
                        <div id="fm-div-flightCreated" className="col-sm-12">Flight was successful created!</div>
                    }

                    {conditionExists && 
                        <div id="fm-div-flightExists" className="col-sm-12">Flight could not be created. It already exists!</div>
                    }

                    {uncondition && 
                        <div id="fm-div-flightNotCreated" className="col-sm-12">Oops! A problem on the server prevented the flight of being created!</div>
                    }

                    {this.state.flightDeleted && 
                        <div id="fm-div-flightDeleted" className="col-sm-12">Flight was successful deleted</div>
                    }

                    {this.state.flightUpdated && 
                        <div id="fm-div-flightUpdated" className="col-sm-12">Flight was successful updated</div>
                    }

                    <div className="col-sm-12" id="submitFlightWrapper">
                        { user && <button id="btnSubmitFlightData" type="submit" className="btn btn-primary btn-flight">Create flight</button> }
                        { user && <button id="btnUpdateFlight" type="button" className="btn btn-warning btn-flight" onClick={(event) => this.updateFlight(event)}>Update flight</button> }
                        { user && <button id="btnDeleteFlight" type="button" className="btn btn-danger btn-flight" onClick={(event) => this.deleteFlight(event)}>Delete flight</button> }
                        <button id="btnSearchFlights" type="button" className="btn btn-success" onClick={(event) => this.searchFlights(event)}>Search flights</button>
                    </div>
                </form>
        
                {resultsCondition && <div className="col-sm-12" id="divTableHeading">Your Search Results</div>}

                {
                    resultsCondition && results.map((result, index) => {
                        let tableId = 'tableFlight_' + index.toString(),
                            btnEditId = 'btnEdit_' + index.toString(),
                            btnBookId = 'btnBook_' + index.toString(),
                            departure = result.departure_date + ' ' + result.departure_time,
                            bookCondition = (this.state.bookIndex === index),
                            bookSuccess = this.state.bookClick && this.state.booked,
                            bookFail = this.state.bookClick && !this.state.booked,
                            arrival = result.arrival_date + ' ' + result.arrival_time;

                        return (
                            <div key={index} className="tableFlightWrapper col-sm-12">
                                <div className="col-sm-1"></div>
                                <table id={tableId} className="col-sm-6 tableFlight">
                                    <tbody>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Origin</th>
                                            <td className="td-flight">{result.origin}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Destination</th>
                                            <td className="td-flight">{result.destination}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Departure</th>
                                            <td className="td-flight">{departure}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Arrival</th>
                                            <td className="td-flight">{arrival}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Airline</th>
                                            <td className="td-flight">{result.airline}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Aircraft</th>
                                            <td className="td-flight">{result.aircraft}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Flight Number</th>
                                            <td className="td-flight">{result.flight_number}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Availability</th>
                                            <td className="td-flight">{result.availability}</td>
                                        </tr>
                                        <tr className="tr-flight">
                                            <th className="th-flight">Price (per Passenger)</th>
                                            <td className="td-flight">{result.price_per_pax}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                {   
                                    bookCondition && 

                                    <div className="col-sm-4">
                                        <div id="personalDataHeading">Your personal data</div>
                                        <form onSubmit={(event) => this.handleBookFlight(event)}>
                                            <div id="fm-div1-form-customer" className="inputlist" >
                                                <div id="fm-div2-form-customer">
                                                    <label htmlFor="customer_name" className="inputlist-label">
                                                        <span className="inputlist-span">
                                                            Name
                                                        </span>
                                                        <input type="text" title="Enter your fullname" ref="customer_name"
                                                               className="inputlist-field extraInput" id="customer_name" name="customer_name" placeholder="Full Name"/>
                                                    </label>
                                                    <label htmlFor="customer_email" className="inputlist-label">
                                                        <span className="inputlist-span">
                                                            Email
                                                        </span>
                                                        <input ref="customer_email" type="text"  title="Enter your email address"
                                                               className="inputlist-field extraInput" id="customer_email" name="customer_email" placeholder="Email" />
                                                    </label>
                                                    <label htmlFor="pax_number" className="inputlist-label">
                                                        <span className="inputlist-span">
                                                            Persons
                                                        </span>
                                                        <input ref="pax_number" type="text"  title="Enter your email address"
                                                               className="inputlist-field extraInput" id="pax_number" name="pax_number" placeholder="Pax number" />
                                                    </label>
                                                    <label htmlFor="Form of payment" className="inputlist-label">
                                                        <span className="inputlist-span">
                                                            Form of Payment
                                                        </span>
                                                        <input ref="payment" type="text"  title="Enter your email address"
                                                               className="inputlist-field extraInput" id="payment" name="payment" placeholder="Payment method" />
                                                    </label>
                                                </div>                 
                                            </div>
                                            { bookFail && 
                                                <div id="fm-wrong-customer-data" ref="error_msg_customer">
                                                    Sorry. This flight could not be booked. :(
                                                </div>
                                            }

                                            { bookSuccess && 
                                                <div id="fm-book-success" ref="success_msg_customer">
                                                    Flight was successfully booked!
                                                </div>
                                            }

                                            <div className="" id="submitBookWrapper">
                                                <button id="btnSubmitBookData" type="submit" className="btn btn-primary">Book Now</button>
                                            </div>
                                        </form>
                                    </div>
                                }

                                <div className="col-sm-1"></div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-6" id="btnsBookEdit">
                                    <button id={btnBookId} type="button" className="btn btn-success btn-edit c" onClick={(event) => this.bookFlight(event)}>Book flight</button> 
                                    { user && <button id={btnEditId} type="button" className="btn btn-info btn-edit" onClick={(event) => this.editFlight(event)}>Edit flight</button>} 
                                </div>
                                <div className="col-sm-5"></div>
                            </div>
                        );
                    })
                }

                {resultsUncondition && <div className="col-sm-12" id="fm-div-noresults">Sorry, no results found!</div>}

    		</div>
		);
    }
}

export default FlightManager;

/*function mapStateToProps (store) {
    return {
        store
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightManager);*/
