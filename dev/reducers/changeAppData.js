import { removeArrayElement } from './../helpers';

let loginData = false,
	user = 'initial',
	flightCreated = 'initial',
	results = false,
	editId = false,
	bookIndex = 'initial',
	bookTarget = {},
	totalPax = 0,
	flightUpdated = false,
	flightDeleted = false,
	booked = false,
	initialState = {
		loginData,
		user,
		bookIndex,
		flightCreated,
		bookTarget,
		totalPax,
		flightUpdated,
		flightDeleted,
		results,
		editId
	};

const changeAppData = (state = initialState, action) => {
	switch(action.type) {
		case "PROCESS_LOGINDATA": {
			const { loginData } = action;

			state = {...state, loginData};
			return state;
			break;
		}

		case "SETUSER": {
			const { user } = action;

			state = {...state, user};
			return state;
			break;
		}

		case "FLIGHT_CREATED": {
			const { flightCreated } = action;

			state = {...state, flightCreated};
			return state;
			break;
		}

		case "UPDATE_SEARCH_RESULTS": {
			const { results } = action;

			state = {...state, results};
			return state;
			break;
		}

		case "PROCESS_TOTALPAXNUMBER": {
			const { totalPax } = action;

			state = {...state, totalPax};
			return state;
			break;
		}

		case "UPDATE_BOOKINDEX": {
			const { bookIndex } = action;

			state = {...state, bookIndex};
			return state;
			break;
		}

		case "UPDATE_EDITID": {
			const { editId } = action;

			state = {...state, editId};
			return state;
			break;
		}

		case "CHANGE_BOOKTARGET": {
			const { bookTarget } = action;

			state = {...state, bookTarget};
			return state;
			break;
		}

		case "CHANGE_AVAILABILITY": {
			const { flight } = action;

			let results = [...state.results];

			results.map((elem, index) => {
				if(elem.id === flight.id) {
					elem.availability = flight.availability;
				}
			});

			state = {...state, results};
			return state;
			break;
		}

		case "UPDATE_BOOK_STATUS": {
			const { booked } = action;

			state = {...state, booked};
			return state;
			break;
		}

		case "UPDATE_FLIGHT": {
			const { flightUpdated } = action;

			state = {...state, flightUpdated};
			return state;
			break;
		}

		case "DELETE_FLIGHT": {
			const { data } = action;

			let flightDeleted = data.flightDeleted,
			    flight_id = data.flight_id,
			    oldResults = [...state.results],
			    results = [],
			    deleteIndex = '';

			deleteIndex = oldResults.map((flight, index) => {
				return flight.id;
			}).indexOf(flight_id);

			results = removeArrayElement(oldResults, deleteIndex);

			state = {...state, flightDeleted, results};
			return state;
			break;
		}

		default:
			return state;
	}
	return state;
}

export default changeAppData;