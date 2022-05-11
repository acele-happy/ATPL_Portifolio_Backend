const mongoose = require('mongoose')
const {Schema,model} = mongoose

let contactSchema = new Schema({
    Name:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        required: true
    }
})

const Contact = model('contacts',contactSchema)
module.exports = Contact