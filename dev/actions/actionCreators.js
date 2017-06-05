import axios from 'axios'
import querystring from 'querystring'
import { hashHistory } from 'react-router'

export function processLoginData(loginData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/handleUserLogin.php',
		    data: querystring.stringify({
		            username: loginData.username,
		            password: loginData.password
		          }),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
			if (response.data.user === 1) {
				dispatch({
					type: "SETUSER",
					user: true
				});
				
        		//hashHistory.push('/fm');

			} else {
				dispatch({
					type: "SETUSER",
					user: false
				});
			}
        })
        .catch(function (error) {
            console.log(error);
        });

        dispatch({
			type: "PROCESS_LOGINDATA",
			loginData
		});
	}	
}

export function searchFlights(flightData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/searchFlights.php',
		    data: querystring.stringify(flightData),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
        	let resultsObj = response.data.results,
        		results = Object.keys(resultsObj).map(key => resultsObj[key]);

        	console.log('res', response.data);

    		dispatch({
				type: "UPDATE_SEARCH_RESULTS",
				results
			});
        })
        .catch(function (error) {
            console.log(error);

            dispatch({
				type: "UPDATE_SEARCH_RESULTS",
				results: []
			});

        });
	}
}

export function processFlightData(flightData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/createFlight.php',
		    data: querystring.stringify(flightData),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
        	const flightCreated = response.data.flightCreated;

    		dispatch({
				type: "FLIGHT_CREATED",
				flightCreated
			});
        })
        .catch(function (error) {
            console.log(error);

            dispatch({
				type: "FLIGHT_CREATED",
				flightCreated: 0
			});

        });
	}	
}

export function createFlight(flightCreated) {
	return function (dispatch) {
		dispatch({
			type: "FLIGHT_CREATED",
			flightCreated
		});
	}
}

export function updateEditId(editId) {
	return function (dispatch) {
		dispatch({
			type: "UPDATE_EDITID",
			editId
		});
	}
}

export function unsetDeleteFlight(flightDeleted) {
	return function (dispatch) {
		dispatch({
			type: "DELETE_FLIGHT",
			data: {
				flightDeleted
			}
		});
	}
}

export function unsetUpdateFlight(flightUpdated) {
	return function (dispatch) {
		dispatch({
			type: "UPDATE_FLIGHT",
			flightUpdated
		});
	}
}

export function updateBookIndex(bookIndex) {
	return function (dispatch) {
		dispatch({
			type: "UPDATE_BOOKINDEX",
			bookIndex
		});
	}
}

export function updateFlightData(flightData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/updateFlight.php',
		    data: querystring.stringify(flightData),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
        	const flightUpdated = response.data.flightUpdated;
        	let flightData = response.data.flightData;

    		dispatch({
				type: "UPDATE_FLIGHT",
				flightUpdated
			});

			axios({
				method: 'POST',
			    url: 'server/searchFlights.php',
			    data: querystring.stringify(flightData),
			    headers: { 
			        "Content-Type": "application/x-www-form-urlencoded"
			    }
			})
	        .then(function (response) {
	        	let resultsObj = response.data.results,
	        		results = Object.keys(resultsObj).map(key => resultsObj[key]);


	    		dispatch({
					type: "UPDATE_SEARCH_RESULTS",
					results
				});
	        })
	        .catch(function (error) {
	            console.log(error);

	            dispatch({
					type: "UPDATE_SEARCH_RESULTS",
					results: []
				});

	        });
        })
        .catch(function (error) {
            console.log(error);

            dispatch({
				type: "UPDATE_FLIGHT",
				flightUpdated: false
			});

        });
	}
}

export function deleteFlightData(flightData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/deleteFlight.php',
		    data: querystring.stringify(flightData),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
        	const flightDeleted = response.data.flightDeleted,
        		  flight_id = response.data.flight_id;

        	document.getElementById('f_origin').value = '';
            document.getElementById('f_destination').value = '';
            document.getElementById('depDate').value = '';
            document.getElementById('arrDate').value = '';
            document.getElementById('f_airline').value = '';
            document.getElementById('f_aircraft').value = '';
            document.getElementById('f_flightnumber').value = '';
            document.getElementById('f_availability').value = '';
            document.getElementById('f_priceperpax').value = '';

    		dispatch({
				type: "DELETE_FLIGHT",
				data: {
					flightDeleted,
					flight_id
				}
			});
        })
        .catch(function (error) {
            console.log(error);

            dispatch({
				type: "DELETE_FLIGHT",
			    data: {
			    	flightDeleted: false
			    }
			});

        });
	}
}

export function book(bookingData) {
	return function(dispatch) {
		axios({
			method: 'POST',
		    url: 'server/bookFlight.php',
		    data: querystring.stringify(bookingData),
		    headers: { 
		        "Content-Type": "application/x-www-form-urlencoded"
		    }
		})
        .then(function (response) {
        	const booked = response.data.booked;

        	console.log('bookingData', response.data);

    		dispatch({
				type: "UPDATE_BOOK_STATUS",
				booked
			});

			dispatch({
				type: 'CHANGE_AVAILABILITY',
				flight: {
					id: response.data.flight_id,
					availability: response.data.availability
				}
			});
        })
        .catch(function (error) {
            console.log(error);

            dispatch({
				type: "UPDATE_BOOK_STATUS",
				booked: false
			});
        });
	}
}

