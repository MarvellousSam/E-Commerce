const bcrypt = require('bcryptjs')
const Products = require('../model/ProductModel')
const Users = require('../model/UserModel')


const getProduct=async(req,res)=>{
    try {
        const {specialOffer} = req.query
        const pageSize = 20
        const page = parseInt(req.query.page) || 1
        const skip = (page-1) * pageSize

        // res.json({totalPage: totalPage})

        if(specialOffer=='true'){
            const product = await Products.find({specialOffer: 'true'}).select('name price location imageUrl').limit(pageSize).skip().limit(5)
            res.json({product: product})
        }
        else{
            const totalNoOfProducts = await Products.countDocuments()
            const totalPage = totalNoOfProducts / pageSize
            const roundedPage = Math.ceil(totalPage)
            console.log(`total page is ${totalPage} and document is ${roundedPage}`)
            const product = await Products.find().select('name price imageUrl location').skip(skip).limit(pageSize).exec()
            if(product.length==0){
                console.log('No products can be found')
            }else{
                res.json({product: product, page: roundedPage})
            }
            

        }
    } catch (error) {
        console.log(error)
    }
    
}



const getCategoryProduct=async(req,res)=>{
    const {category} = req.params
    const pageSize = 5
    const page = parseInt(req.query.page) || 1
    const skip = (page-1) * pageSize
    const totalNoOfProducts = await Products.countDocuments()
    const totalPage = totalNoOfProducts / pageSize
        try {
            console.log(`params is ${category}`)
            const product = await Products.find({category}).select('name price location imageUrl').skip(skip).limit(pageSize).exec()
            if(product.length==0){
                console.log('No products found')
            }else{
                res.json({product: product, totalPage: totalPage})
            }
        } catch (error) {
            console.log(error)
        }
}



const getProductByName=async(req, res)=>{
    console.log('name running')
    const {name} = req.params
    const pageSize = 5
    const page = parseInt(req.query.page) || 1
    const skip = (page-1) * pageSize
        try {
            const product = await Products.find({name: name}).select('name price location imageUrl').skip(skip).limit(pageSize).exec()
            if(product.length==0){
                console.log('No products found')
            }else{
                res.json({product: product})
            }
        } catch (error) {
            console.log(error)
        }
}



const getSingleProduct=async(req,res)=>{
    const {id} = req.params
        try {
            const product = await Products.findById(id)
            res.status(201).json({product: product})
            
        } catch (error) {
            console.log(error)
        }
}


const createProduct=async(req,res)=>{
    try {
        const email = req.query.email
        const password = req.query.password
        const user = await Users.findOne({email})

        const {name, brand, price, description, location, category, imageUrl, contact} = req.body
        if(!name|| !brand || !price || !description || !location || !category || !password || !imageUrl|| !contact){
            console.log('Please include all fields')
            res.json({message: 'Include all fields'})
        }

        if(user){
            console.log('creating product running')
            const product = await Products.create({
                name: name,
                brand: brand,
                price: price,
                location: location,
                category: category,
                userId: user._id,
                imageUrl: imageUrl,
                contact: contact,
                description: description
            })
            console.log('Products created successfully')
        }

    } catch (error) {
        console.log(error)
    }
}



const searchItems=async(req, res)=>{

        try {  
                const products = await Products.find({}).select('name brand')
                res.json({products}); 
            } catch (error) {  
                console.error('Error searching for products:', error);  
                res.status(500).json({ message: 'Internal Server Error', error: error.message });  
            }
}


const getBrandList = async(req,res)=>{
    const category = req.params.category
    try {
        const brandList = await Products.distinct('brand', {category: category})
        console.log(brandList)
        res.json({brandItems: brandList })
    } catch (error) {
        console.log(error)
    }
}

const getBrandProducts = async(req,res)=>{
    const {brand, category} = req.params
    try {
        console.log('brand product running')
        const products = await Products.find({category: category, brand: brand}).select('name price location imageUrl').limit(20)
        res.json({products: products })
        console.log(products)
    } catch (error) {
        console.log(error)
    }
}

const getStoreProducts=async(req, res)=>{
    const {email} = req.params
    const pageSize = 5
    const page = parseInt(req.query.page) || 1
    const skip = (page-1) * pageSize
    const totalNoOfProducts = await Products.countDocuments()
    const totalPage = totalNoOfProducts / pageSize
        try {
            console.log(`store email ${email}`)
            const user = await Users.findOne({email}).select('_id')
            const id = user._id
            const product = await Products.find({userId: id }).select('name price location imageUrl').skip(skip).limit(pageSize).exec()
            if(product.length==0){
                console.log('No products found')
            }else{
                res.json({product: product, totalPage: totalPage})
            }
        } catch (error) {
            console.log(error)
        }
}

    const deleteStoreItem=async(req, res)=>{
        console.log('delete running')
        const {email, id} = req.params
        try {
            const user = await Users.findOne({email}).select('_id')
            const userId = user._id
            const product = await Products.deleteOne({_id: id, userId: userId})
            res.json({product: product})
        } catch (error) {
            console.log(error)
        }
    }


module.exports = {getProduct, createProduct, getCategoryProduct, getSingleProduct, searchItems, getBrandList, getBrandProducts, getProductByName, getStoreProducts, deleteStoreItem}