import React, {Suspense, useRef} from 'react'
import {useDispatch} from 'react-redux'
import { getUserList } from '@/store/actionCreators/user'

function UserList() {
	const dispatch = useDispatch()
	const resourceRef = useRef()
	if (!resourceRef.current) {
		const promise = dispatch(getUserList())
		const resource = wrapPromise(promise)
		resourceRef.current = resource
	}
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<User resource={resourceRef.current}/>
		</Suspense>
	)
}

function User({ resource }) {
	let list = resource.read()
	return (
		<ul>
			{
				list.map(user => <li key={user.id}>{user.name}</li>)
			}
		</ul>
	)
}

function wrapPromise(promise) {
	let status = "pending"
	let result;
	let suspender = promise.then(
		r => {
			status = "success"
			result = r
		},
		e => {
			status = "error"
			result = e
		}
	)
	return {
		read() {
			if (status === "pending") {
				throw suspender
			} else if (status === "error") {
				throw result
			} else if (status === "success") {
				return result
			}
		}
	}
}

export default UserList