import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getUserList } from '@/store/actionCreators/user'

function UserList() {
	const list = useSelector(state => state.user.list)
	const dispatch = useDispatch()
	useEffect(() => {
		if (list.length === 0) {
			// api 接口提供用户列表服务，调用此接口返回数据放置到 store 中
			dispatch(getUserList())
			// dispatch()
		}
	}, [])
	return (
		<ul>
			{
				list.map(user => <li key={user.id}>{user.name}</li>)
			}
		</ul>
	)
}

export default UserList