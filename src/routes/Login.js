import React, {useRef} from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/store/actionCreators/auth'

function Login(){
	const nameRef = useRef()
	const dispatch = useDispatch()
	const handleSubmit = (event) => {
		event.preventDefault()
		const name = nameRef.current.value
		dispatch(login({name}))
	}
	return (
		<form onSubmit={handleSubmit}>
			用户名：<input ref={nameRef}/>
			<input type="submit"/>
		</form>
	)
}

export default Login