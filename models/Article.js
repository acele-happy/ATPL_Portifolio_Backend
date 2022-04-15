import mongoose from "mongoose"
const {Schema, model}= mongoose

const articleSchema = new Schema({
    Picture:{
        type: String,
        required: true
    },
    Content:{
        type: String,
        required: true
    }
})
export const Article = model("article",articleSchema)
