const moongose = require('mongoose');
const { Schema } = moongose;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email:{ type:String, unique:true, lowercase:true },
    displayName:String,
    avatar:{ type:String, default:null},
    password:{ type:String, select:false },
    signUpDate:{ type: Date, default:Date.now() },
    lastLogin: Date
})

UserSchema.pre('save',function (next){
    let user = this;
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next()

        bcrypt.hash(user.password,salt,null,(err,hash) =>{
            if(err) return next()

            user.password = hash;
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(password,passwordDb){
    return new Promise((resolve,reject) => {
        bcrypt.compare(password,passwordDb,(err,isMatch) => {
            if(err) reject({
                status:404,
                message:'Contraseña incorrecta'
            })

            resolve(isMatch)
        })
    })
}
module.exports = moongose.model('User',UserSchema);