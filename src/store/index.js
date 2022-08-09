import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'
import counter from './reducers/counter'
import user from './reducers/user'
import auth from './reducers/auth'
import clientRequest from '@/client/request'
import serverRequest from '@/server/request'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

const clientThunk = thunk.withExtraArgument(clientRequest)
const serverThunk = thunk.withExtraArgument(serverRequest)

export function getClientStore() {
	const initialState = window.context.state
	const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ history: createBrowserHistory() })
	const reducers = { counter, user, auth, router: routerReducer }
  const combinedReducers = combineReducers(reducers)
	const store = applyMiddleware(clientThunk, promise, routerMiddleware, logger)(createStore)(combinedReducers, initialState)
	const history = createReduxHistory(store)
	return { store, history }
}

export function getServerStore() {
	const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ history: createMemoryHistory() })
	const reducers = { counter, user, auth, router: routerReducer }
  const combinedReducers = combineReducers(reducers)
	const store = applyMiddleware(serverThunk, promise, routerMiddleware, logger)(createStore)(combinedReducers)
	const history = createReduxHistory(store)
	return { store, history }
}