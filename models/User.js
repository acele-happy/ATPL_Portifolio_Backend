import mongoose from "mongoose"
const {Schema, model} = mongoose

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

export const User= model('users',userSchema)