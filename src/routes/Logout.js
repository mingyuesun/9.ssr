import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/actionCreators/auth'

function Logout(){
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(logout())
	}
	return (
		<div>
			<button onClick={handleLogout}>退出</button>
		</div>
	)
}

export default Logout