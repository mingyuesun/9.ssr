import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'
import counter from './reducers/counter'
import user from './reducers/user'
import clientRequest from '@/client/request'
import serverRequest from '@/server/request'

const clientThunk = thunk.withExtraArgument(clientRequest)
const serverThunk = thunk.withExtraArgument(serverRequest)
const reducers = {
	counter,
	user
}
const combinedReducers = combineReducers(reducers)

export function getClientStore() {
	const initialState = window.context.state
	return applyMiddleware(clientThunk, promise, logger)(createStore)(combinedReducers, initialState)
}

export function getServerStore() {
	return applyMiddleware(serverThunk, promise, logger)(createStore)(combinedReducers)
}