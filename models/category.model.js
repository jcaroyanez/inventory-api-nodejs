const mongoose = require('mongoose')
const moment = require('moment')
const { Schema } = mongoose;

const categorySchema = new Schema({
    name:{ type:String, unique:true },
    deleted:{ type:Number, default: 0 },
    crated_at:{ type:Date, default:moment.now() },
    update_at:{ type:Date }
})

module.exports = mongoose.model('Category',categorySchema)