import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

//Component that shows more information about eacg dog
function Detail() {
	//With useLocation hook and location.state we get the information pass by our 'Dogs' component that redirects to this route
	const location = useLocation()
	let { dogDetail } = location.state

	return (
		<div>
			<Link to="/dogs">Volver a Perros</Link>
			<div>{dogDetail.name}</div>
			<div>{dogDetail.temperaments}</div>
			<img src={dogDetail.image} alt="Dog"></img>
			<div>{dogDetail.height}</div>
			<div>{dogDetail.weight}</div>
			<div>{dogDetail.life_span}</div>
		</div>
	)
}

export default Detail
