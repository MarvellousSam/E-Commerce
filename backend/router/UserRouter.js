const express = require('express')
const Router = express.Router()
const {loginUser, registerUser, getUserDetails} = require('../controller/UserController')
Router.post('/login', loginUser)
Router.post('/register', registerUser)
Router.get('/user/:email', getUserDetails)
module.exports = Router