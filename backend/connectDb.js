const mongoose = require('mongoose')

const connectDb=async()=>{
    try{
        const mongoUrl = process.env.MONGO_URL
        const db = await mongoose.connect(mongoUrl)
        console.log(`Database connected to ${db.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb