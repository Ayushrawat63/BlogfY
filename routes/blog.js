const { Router } = require("express");
const upload=require('../config/multer');
const Blog =require('../models/blog');

const { blogsShow, blogUpload, showBlogById } = require("../controller/blogCreation");
const router= Router()


router.get('/',blogsShow)


router.post("/create",upload.single("CoverImage"),async(req,res)=>{
    try{
          let {Title,Content}=req.body
          console.log(req.body)
          console.log(req.file)
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

router.get('/:id',showBlogById)

module.exports=router