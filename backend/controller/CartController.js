const Cart = require('../model/CartModel')

const getItemCart=async(req,res)=>{
    const {user} = req.query
    try {
        const cart = await Cart.find({emailId: user}).populate('productId')
        res.json({cart: cart})
        console.log('Cart item loaded successfully')
    } catch (error) {
        console.log(error)
    }
}


const addItemCart=async(req,res)=>{
    try{
        const {item, user} = req.body
        const cartExist = await Cart.findOne({productId: item})
        if(cartExist){
            console.log('Item was already found in the cart')
            res.json({message: 'found'})
        }
        else{

            const cart = await Cart.create({
                productId: item,
                emailId: user
                
            })
            console.log(`cart ${cart} item added successfully`)
        }

    }catch(error){
        console.log(error)
    }
}



const deleteItemCart=async(req,res)=>{
    try {
        const {user} = req.params
        const {id} = req.params
        await Cart.deleteOne({productId: id, emailId: user })
        console.log('Item deleted from cart successfully')
        const cart = await Cart.find({emailId: user}).populate('productId')
        res.json({cart: cart})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getItemCart, addItemCart, deleteItemCart}