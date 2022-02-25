import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
	allDogs: [],
	temperaments: [],
	filteredDogs: [],
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_DOGS':
			return {
				...state,
				allDogs: [...action.payload],
				filteredDogs: [...action.payload],
			}
		case 'GET_TEMPERAMENTS':
			action.payload = action.payload.sort(function (a, b) {
				if (a.name < b.name) {
					return -1
				}
				if (a.name > b.name) {
					return 1
				}
				return 0
			})
			action.payload.unshift({ name: 'All', id: 0 })
			return {
				...state,
				temperaments: action.payload,
			}

		case 'FILTER_BY_SOURCE':
			if (action.payload === 'api') {
				let filteredByApi = state.allDogs.filter((dog) => {
					return !dog.id.toString().startsWith('1122')
				})

				return {
					...state,
					filteredDogs: filteredByApi,
				}
			}

			if (action.payload === 'db') {
				let filteredByDb = state.allDogs.filter((dog) => {
					return dog.id.toString().startsWith('1122')
				})

				return {
					...state,
					filteredDogs: filteredByDb,
				}
			} else {
				return { ...state, filteredDogs: state.allDogs }
			}
		case 'FILTER_ALPHABETICAL':
			if (action.payload === 'az') {
				let filterAZ = state.filteredDogs.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return 1
					}
					if (b.name.toLowerCase() > a.name.toLowerCase()) {
						return -1
					}
					return 0
				})

				return {
					...state,
					filteredDogs: filterAZ,
				}
			} else {
				let filterZA = state.filteredDogs.sort((a, b) => {
					if (a.name.toLowerCase() > b.name.toLowerCase()) {
						return -1
					}
					if (b.name.toLowerCase() > a.name.toLowerCase()) {
						return 1
					}
					return 0
				})

				return {
					...state,
					filteredDogs: filterZA,
				}
			}
		case 'FILTER_BY_WEIGHT':
			if (action.payload === 'desc') {
				let filterDesc = state.filteredDogs.sort((a, b) => {
					if (a.avgWeight > b.avgWeight) {
						return 1
					}
					if (b.avgWeight > a.avgWeight) {
						return -1
					}
					return 0
				})

				filterDesc = filterDesc.filter(
					(dog) => dog.weight !== 'Weight is not available'
				)

				return {
					...state,
					filteredDogs: filterDesc,
				}
			} else {
				let filterAsc = state.filteredDogs.sort((a, b) => {
					if (a.avgWeight > b.avgWeight) {
						return -1
					}
					if (b.avgWeight > a.avgWeight) {
						return 1
					}
					return 0
				})
				filterAsc = filterAsc.filter(
					(dog) => dog.weight !== 'Weight is not available'
				)

				return {
					...state,
					filteredDogs: filterAsc,
				}
			}
		case 'FILTER_BY_TEMPERAMENTS':
			if (action.payload === 'All') {
				return {
					...state,
					filteredDogs: state.allDogs,
				}
			}
			let filteredByTemperament = state.allDogs.filter((dog) =>
				dog.temperaments.includes(action.payload)
			)

			return {
				...state,
				filteredDogs: filteredByTemperament,
			}
		case 'FILTER_BY_NAME':
			let searchedDog = state.allDogs.find((dog) => {
				return (
					dog.name.toLowerCase().trim() === action.payload.toLowerCase().trim()
				)
			})

			return {
				...state,
				filteredDogs: [searchedDog],
			}
		default:
			return { ...state }
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
