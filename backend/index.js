
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT= process.env.PORT||5000
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const connectDb = require('./connectDb')
connectDb()

app.get('/',(req,res)=>{
    res.json({message: 'welcome to mharvix ecommerce site'})
})
app.use('/api', require('./router/UserRouter'))
app.use('/api', require('./router/ProductRouter'))
app.use('/api', require('./router/CartRouter'))
app.use('/api', require('./router/EventRouter'))

app.listen(PORT||5000,()=>{
    console.log(`server is running on port ${PORT}`)
})

