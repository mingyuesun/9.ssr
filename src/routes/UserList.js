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

// 当前的路由组件在服务器端获取数据的方法
UserList.loadData = (store) => {
	// 等此 Promise 完成后，store 中就有数据了， 即可以用 store 中的数据渲染带真实数据的组件，发给客户端
	return store.dispatch(getUserList())
}

export default UserList