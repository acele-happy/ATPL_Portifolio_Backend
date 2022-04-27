import mongoose from "mongoose"
const {Schema, model} = mongoose
import jwt from 'jsonwebtoken'
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

})

userSchema.methods.generateAuthToken = function(){
    const token = sign(
        {_id: this._id, Password: this.Password},(process.env.JWT_SECRET).trim()
    )
    return 'Bearer '+token
}

const User= model('users',userSchema)
export default User