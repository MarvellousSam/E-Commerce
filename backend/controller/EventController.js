const Event = require('../model/EventModel')


const getEvent=async(req,res)=>{
    try {
        const event = await Event.aggregate([{$sample: {size: 1}}])
        if(!event){
            res.json({message: 'No event found'})
        }else{
            res.json({event: event })
        }
    } catch (error) {
        console.log(error)
    }
}

const createEvent=async(req,res)=>{
    const {imageUrl} = req.body
    try {
        const event = await Event.create({
            imageUrl: imageUrl
        })
        console.log('New event created successfully')
    } catch (error) {
        console.log(error)
    }
}


const deleteEvent=async(req,res)=>{
    const {id} = req.params
    try {
        const event = await event.deleteOne({id: id})
        console.log('Event deleted successfully')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getEvent, createEvent, deleteEvent}