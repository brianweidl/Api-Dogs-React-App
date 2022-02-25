import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
	return (
		<div>
			<p>Imagen de perros</p>
			<Link to="/dogs">To Dogs</Link>
		</div>
	)
}

export default Home
