const mongoose =require( "mongoose")
const {Schema, model} = mongoose
const jwt =require( 'jsonwebtoken')
const {sign} = jwt

let userSchema= Schema({
    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        unique: true,
        required: true
    },
    Password:{
        type: String,
        required:true
    },
    ProfilePicture:{
        type: String,
        default: "https://res.cloudinary.com/dweikgdwq/image/upload/v1635536979/sample.jpg"
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {_id: this._id, Password: this.Password},(process.env.JWT_SECRET).trim()
    )
    return 'Bearer '+token
}

const User= model('users',userSchema)
module.exports = User