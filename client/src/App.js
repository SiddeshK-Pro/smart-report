import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import User from './pages/User'
import Dashboard from './pages/Dashboard'
import Authentication from './utils/Authentication'
import { Switch } from 'react-router-dom/cjs/react-router-dom'
import GenerateReport from './pages/GenerateReport'
import History from './pages/History'
const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/user" component={User} />
					<Route path="/dashboard" component={Authentication(Dashboard)} />
					<Route path="/generate-report/:reportId" component={Authentication(GenerateReport)} />
					<Route path="/report-history" component={Authentication(History)} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
