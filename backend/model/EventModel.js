const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    imageUrl: String

},
{
    timestamps: true
})

module.exports = mongoose.model('EventModel', EventSchema, 'events')