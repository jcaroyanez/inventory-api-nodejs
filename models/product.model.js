const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const moment = require('moment')


const ProductSchema = new Schema({
    name:{ type:String, unique:true },
    sale_price:{ type:Schema.Types.Decimal128},
    purchase_price:{ type:Schema.Types.Decimal128},
    quantity:{ type:Number, default:0 },
    category:{ type:Schema.Types.ObjectId, ref: 'Category' },
    deleted:{ type:Number, default:0 },
    created_at:{ type:Date, default:moment.now() },
    updated_at:{ type:Date }
})

module.exports = mongoose.model('Product',ProductSchema)