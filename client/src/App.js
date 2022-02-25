import React from 'react'
import store from './Store/Store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import NavBar from './Components/NavBar.jsx'
import Detail from './Components/Detail.jsx'
import DogCreate from './Components/DogCreate'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/dogs">
						<NavBar></NavBar>
					</Route>
					<Route exact path="/dog-detail">
						<Detail></Detail>
					</Route>
					<Route exact path="/dog-lab">
						<DogCreate />
					</Route>
				</Switch>
			</Router>
		</Provider>
	)
}

export default App
