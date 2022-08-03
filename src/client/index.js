import React from 'react'
import {hydrateRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import {getClientStore} from '@/store'
const store = getClientStore()

const root = document.getElementById("root")
hydrateRoot(root, 
	<BrowserRouter>
		<App store={store}/>
	</BrowserRouter>
)