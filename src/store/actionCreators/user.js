import { SET_USER_LIST, USER_ADD } from '../actionTypes'
import axios from 'axios'

export function getUserList() {
	return function(dispatch, getState) {
		return axios.get('http://localhost:8000/api/users').then(res => {
			const { users } = res.data
			dispatch({
				type: SET_USER_LIST,
				payload: users
			})
		})
	}
}

export function addUser(user) {
	return { type: USER_ADD, payload: user }
}