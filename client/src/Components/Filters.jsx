import React from 'react'
import Dogs from './Dogs.jsx'
import axios from 'axios'
import { connect } from 'react-redux'
import {
	filterBySource,
	filterAlphabetical,
	filterByWeight,
	getTemperaments,
	filterByTemperament,
} from '../Actions/Actions'
import { useState, useEffect } from 'react'

//Component to display possible filters and dispatch filter actions
function Filters({
	getTemperaments,
	filterBySource,
	filterAlphabetical,
	filterByWeight,
	filterByTemperament,
	temperaments,
}) {
	//States to re-render child and set current page back to 1 whenever we filter data
	let [filtered, setFiltered] = useState(0)
	let [currentPage, setCurrentPage] = useState(1)

	//This hook dispatch an action to set the temperaments available in the Redux store
	useEffect(() => {
		const getAllTemperaments = async () => {
			let temperamentsPost = await axios.post(
				'http://localhost:3001/temperament'
			)

			getTemperaments(temperamentsPost.data)
		}
		getAllTemperaments()
	}, [])

	//Filters dogs depending on where they come from (API or database)
	let sortBySource = () => {
		setFiltered(() => {
			return filtered + 1
		})
		let rbApi = document.getElementById('api')
		let rbDatabase = document.getElementById('database')
		if (rbApi.checked === true) {
			filterBySource('api')
			filterAlphabetical('az')
			setCurrentPage(1)
		} else if (rbDatabase.checked === true) {
			filterBySource('db')
			filterAlphabetical('az')
			setCurrentPage(1)
		} else {
			filterBySource('all')
			filterAlphabetical('az')
			setCurrentPage(1)
		}
	}
	//Filter alphabetically
	let sortByAZ = () => {
		setFiltered(() => {
			return filtered + 1
		})
		let rbZA = document.getElementById('za')
		if (rbZA.checked === true) {
			setFiltered(() => {
				return filtered + 1
			})
			filterAlphabetical('za')
			setCurrentPage(1)
		} else {
			setFiltered(() => {
				return filtered + 1
			})
			filterAlphabetical('az')
			setCurrentPage(1)
		}
	}

	//Filter by weight
	let sortByWeight = () => {
		setFiltered(() => {
			return filtered + 1
		})
		let rbDesc = document.getElementById('desc')
		if (rbDesc.checked === true) {
			filterByWeight('desc')
			setCurrentPage(1)
		} else {
			filterByWeight('asc')
			setCurrentPage(1)
		}
	}

	//Filter by temperament
	let selectTemperament = () => {
		let selectedTemperament = document.getElementById('temperament').value
		filterByTemperament(selectedTemperament)
		filterAlphabetical('az')
		setCurrentPage(1)
	}

	return (
		<div>
			<div>
				<div>Temperament:</div>
				<select id="temperament">
					{temperaments.map((temp, index) => (
						<option key={index}>{temp.name}</option>
					))}
				</select>
				<button onClick={() => selectTemperament()}>BOTON</button>
			</div>
			<div>
				Source:
				<input type="radio" id="api" name="source"></input>
				<label htmlFor="api">Api</label>
				<input type="radio" id="database" name="source"></input>
				<label htmlFor="database">Database</label>
				<input type="radio" id="all" name="source"></input>
				<label htmlFor="all">All</label>
				<button onClick={() => sortBySource()}>BOTON</button>
			</div>
			<div>
				Sort Alphabetically
				<input type="radio" id="az" name="sortByAZ"></input>
				<label htmlFor="az">A - Z</label>
				<input type="radio" id="za" name="sortByAZ"></input>
				<label htmlFor="za">Z -A</label>
				<button onClick={() => sortByAZ()}>BOTON</button>
			</div>
			<div>
				Sort By Weight
				<input type="radio" id="asc" name="sortByWeight"></input>
				<label htmlFor="asc">Heavier</label>
				<input type="radio" id="desc" name="sortByWeight"></input>
				<label htmlFor="desc">Lighter</label>
				<button onClick={() => sortByWeight()}>BOTON</button>
			</div>
			<Dogs
				filtered={filtered}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			></Dogs>
		</div>
	)
}
// Get temperaments from the store for our temperament 'select' HTML element
function mapStateToProps(state) {
	return {
		temperaments: state.temperaments,
	}
}

//Get all the action to dispatch our filters to the reducer
function mapDispatchToProps(dispatch) {
	return {
		filterBySource: (source) => dispatch(filterBySource(source)),
		filterAlphabetical: (alpha) => dispatch(filterAlphabetical(alpha)),
		filterByWeight: (sort) => dispatch(filterByWeight(sort)),
		getTemperaments: (temperaments) => dispatch(getTemperaments(temperaments)),
		filterByTemperament: (temp) => dispatch(filterByTemperament(temp)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
