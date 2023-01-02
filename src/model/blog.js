const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    createdby:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        default:Date.now()
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{text:String,commentby:String}]
})

const Blog = mongoose.model("blog",blogSchema)
module.exports = Blog