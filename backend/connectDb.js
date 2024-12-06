const mongoose = require('mongoose')

const connectDb=async()=>{
    try{
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected to ${db.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb
