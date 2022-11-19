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
    }
})

const Blog = mongoose.model("blog",blogSchema)
module.exports = Blog