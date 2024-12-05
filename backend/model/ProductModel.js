const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
    name: String,
    brand: String,
    price: Number,
    location: String,
    description: String,
    category: String,
    specialOffer: String,
    imageUrl: String,
    contact: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
    // userId should be supplier Id
},
{
    timestamps: true
}
)


module.exports = mongoose.model('Product', productSchema, 'products')