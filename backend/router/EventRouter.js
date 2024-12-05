const express = require('express')
const Router = express.Router()
const {getEvent, createEvent, deleteEvent} = require('../controller/EventController')
Router.get('/event', getEvent)
Router.post('/event', createEvent)
Router.delete('/event/:id', deleteEvent)
module.exports = Router