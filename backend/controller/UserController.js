const Users = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')

const generateToken = (id)=>{
    console.log('generating token')
    const secret = process.env.JWT_SECRET || '12345'
    return jwt.sign({id}, secret, {
        expiresIn: '5h'
    })
    console.log('Token generated')
}


const getUserDetails=async(req,res)=>{
    const {email} = req.params
    const user = await Users.findOne({email})
    if(user){
        res.json({user: user})
    }
    
}



const loginUser=async(req,res)=>{
    const {email, password} = req.body
    if(!email || !password ){
        res.json({message:'Fill in all the fields'})
        console.log('Missing field')
    }
    const user = await Users.findOne({email})
    const role = user.role
    const match = await bcrypt.compare(password, user.password)
    if(!user){
        console.log('User does not exist')
    }
    else if(user && match){
        res.json({message:'successful', email: email, token: generateToken(user._id)})
        console.log('User successfully logged in')

    }

    else{
        console.log('Incorrect login credentials')
    }

}




const registerUser=async(req,res)=>{
    const {username, email, password, confirmPassword} = req.body


    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "marvel10cent@gmail.com",
          pass: "ueiw rmkk fman oeva",
        },
      });
    
      // async..await is not allowed in global scope, must use a wrapper
    const sendMail =async()=>{
        try {
              // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: 'marvel10cent@gmail.com', // sender address
                    to: `${email}`, // list of receivers
                    subject: "Shopify Registration", // Subject line
                    text: "Your email has been successfully registered on the SHOPIFY platform" // plain text body
                });
    
                console.log('Email sent successfully')
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        } catch (error) {
            console.log(error)
        }
    }



    try {
        if(!username || !email || !password || !confirmPassword){
            res.json({message:'Fill in all the fields'})
            console.log('Missing field')
        }

        const user = await Users.findOne({email: email})
        if(user){
            res.json({message: 'User already exist'})
            console.log('A user already registered with this email')
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const userCreated = await Users.create({
                username: username,
                email: email,
                password: hashedPassword
            })
            res.json({message: 'successful', email: email})
            console.log(userCreated)
            sendMail()
        }
    

    } catch (error) {
        console.log(error)
    }

}


const getMe = async(req, res) =>{
    try {
        const user = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.username
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}








module.exports = {registerUser, loginUser, getUserDetails, getMe}