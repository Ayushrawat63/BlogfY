const {Schema ,model} =require('mongoose')

const blogSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImage:{
        type:Buffer,
        required:true
    },
    createdBy:{
         type:Schema.Types.ObjectId,
         ref:"user"
    }
},{timestamps:true})


const Blog=model('blog',blogSchema)

module.exports=Blog;