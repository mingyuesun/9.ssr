import React from 'react'
import {hydrateRoot} from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import App from '@/App'
import {getClientStore} from '@/store'
const { store, history } = getClientStore()

const root = document.getElementById("root")
hydrateRoot(root, 
	// <BrowserRouter>
	// 	<App store={store}/>
	// </BrowserRouter>
	<Router history={history}>
		<App store={store}/>
	</Router>
)