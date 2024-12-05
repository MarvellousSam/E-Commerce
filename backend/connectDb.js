const mongoose = require('mongoose')

const connectDb=async()=>{
    try{
        const db = await mongoose.connect('mongodb+srv://marvel10cent:Oloriburuku10@cluster0.rkjsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log(`Database connected to ${db.connection.host}`)
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb