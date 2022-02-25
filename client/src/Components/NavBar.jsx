import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import Filters from './Filters'
import { connect } from 'react-redux'
import { filterByName } from '../Actions/Actions'

function NavBar({ filterByName }) {
	let [filtered, setFiltered] = useState(0)
	let searchByName = () => {
		setFiltered(() => {
			return filtered + 1
		})
		let input = document.getElementById('inputName')

		filterByName(input.value)
	}
	return (
		<div className="container">
			<input placeholder="search..." id="inputName"></input>
			<button onClick={() => searchByName()}>X</button>
			<Link to="/dog-lab">Create your own dog</Link>
			<Filters filtered={filtered}></Filters>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {}
}

function mapDispatchToProps(dispatch) {
	return {
		filterByName: (name) => dispatch(filterByName(name)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
