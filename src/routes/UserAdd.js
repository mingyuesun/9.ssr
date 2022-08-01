import React, {useRef} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '@/store/actionCreators/user'

function UserAdd() {
	const nameRef = useRef()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const handleSubmit = (event) => {
		event.preventDefault()
		const name = nameRef.current.value
		dispatch(addUser({name, id: Date.now()}))
		navigate('/user/list')
	}
	return (
		<form onSubmit={handleSubmit}>
			用户名:<input ref={nameRef}/>
			<input type="submit"/>
		</form>
	)
}

export default UserAdd