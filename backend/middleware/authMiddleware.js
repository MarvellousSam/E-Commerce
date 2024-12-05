const jwt = require('jsonwebtoken')
const User = require('../model/UserModel')
const mongoose = require('mongoose')

const protect = async (req, res, next) => {
    
        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET )
                console.log(`token ${decoded.id}`)
                req.user = await User.findById(new mongoose.Types.ObjectId(decoded.id)).select('-password')
                next()
            } catch (error) {
                console.log(error)
            }
        }
        if(!token){
            console.log('Not authorised')
            res.json({message: 'Not authorised'})
        }
     
}


module.exports = {protect}
