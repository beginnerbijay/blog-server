const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth')
const Blog = require("../model/blog");
  
router.get("/", auth ,async(req, res) => {
    try{
    const post = await Blog.find()
    if(post){
        res.send(post)
    }else{
        res.send("fail to show all post")
    }
    }catch(e){
      console.log(e)
    }
  });

router.post("/create", auth ,async(req, res) => {
    try{
    const post = new Blog(req.body)
    const newpost = await post.save()
    if(newpost){
        res.send(newpost)
    }else{
        res.send("fail at backend")
    }
    }catch(e){
      console.log(e)
    }
  });

router.get("/singleblog/:id", auth ,async(req, res) => {
    try{
    const post = await Blog.findById({_id:req.params.id})
    if(post){
      res.send(post)
    }else{
      res.send("doesn't exist")
    }
    }catch(e){
      console.log(e)
    }
  });

router.get("/myblog/:createdby", auth ,async(req, res) => {
    try{
    const post = await Blog.find({createdby:req.params.createdby})
    if(post){
      res.send(post)
    }else{
      res.json({msg:"doesn't exist"})
    }
    }catch(e){
      console.log(e)
    }
  });
  
router.patch("/edit/:id", auth ,async(req, res) => {
    try{
      const {tittle,img,content} = req.body
    const post = await Blog.findByIdAndUpdate({_id:req.params.id},{tittle,img,content},{
      new:true
    })
    if(post){
        res.send(post)
    }else{
        res.send("fail at backend")
    }
    }catch(e){
      console.log(e)
    }
  });

router.delete("/delete/:id", auth ,async(req, res) => {
    try{
    const post = await Blog.findByIdAndDelete({_id:req.params.id})
    if(post){
        res.send("deleted")
    }else{
        res.send("fail at backend")
    }
    }catch(e){
      console.log(e)
    }
  });
  

module.exports = router