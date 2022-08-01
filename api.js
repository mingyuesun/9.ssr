const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const users = [{name: 'test1', id: 1},{name: 'test2', id: 2},{name: 'test3', id: 3}]
app.get('/api/users', (req, res) => {
	res.json({
		success: true,
		users: users
	})
})
app.listen('8000', () => console.log('api server started on port 8000'))
