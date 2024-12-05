const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema(
    {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    emailId: {
        type: String
        // ref: 'User'
    },
    quantity: {
        type: Number
    }

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Cart', CartSchema, 'carts')