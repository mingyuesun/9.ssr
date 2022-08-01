import { SET_USER_LIST, USER_ADD } from '../actionTypes'
const initialState= {list: []}
function user(state = initialState, action) {
	switch(action.type){
		case SET_USER_LIST:
			return {list: action.payload}
		case USER_ADD:
			return {list: [...state.list, action.payload]}
		default:
			return state
	}
}

export default user
