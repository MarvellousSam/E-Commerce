const express = require('express')
const Router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getItemCart, addItemCart, deleteItemCart} = require('../controller/CartController')
Router.get('/cart', protect, getItemCart)
Router.post('/cart', protect,  addItemCart)
Router.delete('/cart/:user/:id', protect, deleteItemCart)
module.exports = Router