const { Router } = require("express");
const User = require("../models/user");
const Blog =require('../models/blog')
const upload=require('../config/multer');
const Comment = require("../models/comment");
const router= Router()


router.get('/', async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.user.id})
            res.render("blogCreate",{
                user
            });
        }
        catch(Err){
       console.log(Err)
        }
})


router.post("/create",upload.single("CoverImage"), async(req,res)=>{
    try{
          let {Title,Content}=req.body
          const newBlog=await Blog.create({
            title:Title,
            content:Content,
            createdBy:req.user.id,
            coverImage:req.file.buffer
          })
           return res.redirect('/')
        }
        catch(Err)
        {
           console.log(Err)
           res.status(500).json({message:"Internal server error"})
        }
})

router.get('/:id',async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.user.id})
        const blog= await Blog.findOne({_id:req.params.id}).populate("createdBy")
        const comments=await Comment.find({blogId:req.params.id}).populate("createdBy")
        
        res.render('blogData',{
            blog,
            user,
            comments
        })
    }
    catch(Err)
    {
       console.log(Err)
       res.status(500).json({message:"Internal server error"})
    }
})

module.exports=router