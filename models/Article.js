const mongoose =require("mongoose")
const {Schema, model}= mongoose

const articleSchema = new Schema({
    Picture:{
        type: Object,
        required: true
    },
    Title:{
        type: String,
        required: true
    },
    Content:{
        type: String,
        required: true
    },
    CloudinaryId:{
        type: String
    },
    Comments:[
        {
            PostedBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
            Message:{type:String, required: true},
            date:{type: Date}
        }
    ],
    Likes:[],
    CreatedAt:{
        type: Date,
        default: Date.now()
    }
})
const Article = model("article",articleSchema)
module.exports = Article
