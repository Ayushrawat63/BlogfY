const Blog =require('../models/blog');
const User =require('../models/user');
const Comment =require('../models/comment');

const blogsShow=async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.user.id})
            res.render("blogCreate",{
                user
            });
        }
        catch(Err){
       console.log(Err)
        }
}

const blogUpload=async(req,res)=>{
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
}

const showBlogById=async(req,res)=>{
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
}

module.exports={
    blogsShow,
    blogUpload,
    showBlogById
}