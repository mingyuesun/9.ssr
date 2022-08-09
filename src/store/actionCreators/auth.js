import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../actionTypes'
import { push } from 'redux-first-history'

export function login(user) {
	return function(dispatch, getState, request) {
		return request.post('/api/login', user).then(res => {
			const { data, success, error } = res.data
			if (success) {
				dispatch({ type: LOGIN_SUCCESS, payload: data })
				dispatch(push('/profile'))
			} else {
				dispatch({ type: LOGIN_ERROR, payload: error })
			}
		})
	}
}

export function logout() {
	return function(dispatch, getState, request) {
		return request.get('/api/logout').then(res => {
			const {success} = res.data
			if (success) {
				dispatch({ type: LOGOUT_SUCCESS })
				dispatch(push('/login'))
			}
		})
	}
}

export function validate() {
	return function(dispatch, getState, request) {
		return request.get('/api/validate').then(res => {
			const { success, data } = res.data
			if (success) {
				dispatch({ type: LOGIN_SUCCESS, payload: data })
			}
		})
	}
}