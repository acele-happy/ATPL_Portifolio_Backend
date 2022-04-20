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
    },
    Comments:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            content:{type:String, required: true},
            date:{type: Date}
        }
    ]
})
export const Article = model("article",articleSchema)
