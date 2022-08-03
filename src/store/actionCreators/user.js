import { SET_USER_LIST, USER_ADD } from '../actionTypes'

export function getUserList() {
	return function(dispatch, getState, request) {
		return request.get(`/api/users`).then(res => {
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