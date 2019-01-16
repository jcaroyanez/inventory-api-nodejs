const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const momnet = require('moment')

const TransaccionProductSchema = new Schema({
    idProduct: { type:Schema.Types.ObjectId, ref:'Product' },
    nameProduct: String,
    quantity:Number,
    type:String,
    created_at:{ type:Date, default:momnet.now() },
    deleted:{ type:Number, default:0 }
})

module.exports = mongoose.model('TransaccionProduct',TransaccionProductSchema) 