import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { getAllDogs } from '../Actions/Actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
/* import styles from '../Styles/dogs.module.css'
 */
//Component to display the dogs information and paginate
function Dogs({
	getAllDogs,
	filteredDogs,
	currentPage,
	setCurrentPage,
	dogsPerPage,
}) {
	const imgStyle = {
		width: '80px',
		height: '80px',
	}
	const [isLoading, setLoading] = useState(false)

	//When the component renders, send a GET request to our server to get the dogs data
	useEffect(() => {
		const axiosDogs = async () => {
			setLoading(true)
			let backEndDogs = await axios.get('http://localhost:3001/dogs')
			getAllDogs(backEndDogs.data)
			setLoading(false)
		}
		axiosDogs()
	}, [getAllDogs])

	//Set variables for pagination
	const indexOfLastDog = currentPage * dogsPerPage
	const indexOfFirstDog = indexOfLastDog - dogsPerPage
	const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog)

	//Functions for our previous and next buttons to show more data
	//Sets the current page function passed by the parent component and disables buttons accordingly
	const followingPage = () => {
		if (currentPage === Math.ceil(filteredDogs.length / dogsPerPage)) {
			return
		}
		let page = currentPage + 1
		setCurrentPage(page)
	}
	const previousPage = () => {
		if (currentPage === 1) {
			return
		}
		let page = currentPage - 1
		setCurrentPage(page)
	}

	return (
		<div>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : currentDogs[0] ? (
					<div>
						<div>
							{currentDogs.map((dog) => (
								<ul key={dog.id}>
									<li>
										{console.log(dog)}
										<div>Name: {dog.name} </div>
										<div>
											Weight:
											{dog.minWeight
												? `${dog.minWeight} - ${dog.maxWeight}`
												: `${dog.weight}`}
										</div>
										<div>Temperament: {dog.temperaments}</div>
										<img
											src={dog.image}
											alt="dogs breed"
											style={imgStyle}
										></img>
										<Link
											to={{
												pathname: '/dog-detail',
												state: { dogDetail: dog },
											}}
										>
											Detail
										</Link>
									</li>
								</ul>
							))}
						</div>

						<button onClick={() => previousPage()}>Previous</button>
						<button onClick={() => followingPage()}>Next</button>
					</div>
				) : (
					<p>No dogs found</p>
				)}
			</div>
		</div>
	)
}

//Pass the dogs to be shown and the getAllDogs action for dispatch in the useEffect hook
function mapStateToProps(state) {
	return {
		filteredDogs: state.filteredDogs,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAllDogs: (dogs) => dispatch(getAllDogs(dogs)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Dogs)
