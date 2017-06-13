import React, { Component } from 'react'
import { render } from 'react-dom'

class TableFlight extends Component {

	constructor(props) {
	    super(props);
        this.handleUserLogin = this.handleUserLogin.bind(this);

	    this.state = {
            user: this.props.store.database.user,
            loginData: this.props.store.database.loginData
	    };
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.store.database.user,
              loginData = nextProps.store.database.loginData;

        this.setState({
            user,
            loginData
        });
    }

    handleUserLogin (event) {
        event.preventDefault();

        let loginData = {
            username: this.refs.admin_username.value,
            password: this.refs.admin_password.value
        }

        this.props.processLoginData(loginData);
    }

    render() {
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
                                    <label htmlFor="payment" className="inputlist-label">
                                        <span className="inputlist-span">
                                            Form of Payment
                                        </span>
                                        <input ref="payment" type="text"  title="Enter your email address"
                                               className="inputlist-field extraInput" id="payment" name="payment" placeholder="Payment method" />
                                    </label>
                                    <label htmlFor="ppp" className="inputlist-label">
                                        <span className="inputlist-span">
                                            Price per pax
                                        </span>
                                        <span ref="ppp" id="ppp">Price</span>
                                    </label>
                                    <label htmlFor="total" className="inputlist-label">
                                        <span className="inputlist-span">
                                            Total amount
                                        </span>
                                        <span ref="total" id="total">Total</span>
                                    </label>
                                    <label htmlFor="duration" className="inputlist-label">
                                        <span className="inputlist-span">
                                            Flight Duration
                                        </span>
                                        <span ref="duration" id="duration">Duration</span>
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
                    <button id={btnBookId} type="button" className="btn btn-success btn-edit" onClick={(event) => this.bookFlight(event)}>Book flight</button> 
                    { user && <button id={btnEditId} type="button" className="btn btn-info btn-edit" onClick={(event) => this.editFlight(event)}>Edit flight</button>} 
                </div>
                <div className="col-sm-5"></div>
            </div>
        );
    }
}

export default TableFlight;