const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
app.use(cors())
app.use(session({
	saveUnintialize: true,
	resave: true,
	secret: 'smy'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const users = [{name: 'test1', id: 1},{name: 'test2', id: 2},{name: 'test3', id: 3}]
app.get('/api/users', (req, res) => {
	res.json({
		success: true,
		data: users
	})
})
app.post('/api/login', (req, res) => {
	const user = req.body
	req.session.user = user
	res.json({
		success: true,
		data: user
	})
})
app.get('/api/logout', (req, res) => {
	req.session.user = null
	res.json({
		success: true
	})
})
app.get('/api/validate', (req, res) => {
	const user = req.session.user
	if (user) {
		res.json({
			success: true,
			data: user
		})
	} else {
		res.json({
			success: false,
			error: '用户未登录'
		})
	}
})
app.listen('8000', () => console.log('api server started on port 8000'))
