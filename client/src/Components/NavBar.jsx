import { React } from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
	return (
		<div className="searchBar">
			<a href="#home">HOME</a>
			<a href="#favs">FAVORITES</a>
			<Link to="/dog-lab">CREATE </Link>
		</div>
	)
}

export default NavBar
