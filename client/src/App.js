import React from 'react'
import store from './Store/Store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './Components/Header.jsx'
import Filters from './Components/Filters'
import Detail from './Components/Detail.jsx'
import DogCreate from './Components/DogCreate'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/">
						<Header></Header>
						<Filters />
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
