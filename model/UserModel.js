const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        validate: {
            validator: function (value) {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value);
            },
            message: 'Please enter a valid email address'
          }
    },
    contact:{
        required:true,
        type:Number,
        validate: {
            validator: function (value) {
            const contactNumberRegex = /^\d{10}$/;;
              return contactNumberRegex.test(value);
            },
            message: 'Please enter a valid contact number'
          }
    },
    gender:{
        required:true,
        type:String,
        enum: ['male', 'female'],
    },
    hobbies:{
        required:true,
        type:[String]
    },
    password:{
        required:true,
        minlength:[6,"Password must be 6 characters"],
        type:String,
        select:false
    },
    isDeleted:{
        type:Boolean,
        default:0
    }
})

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel