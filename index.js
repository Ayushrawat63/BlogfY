const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const blogRoute=require('./routes/blog')
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongooseConnect = require("./config/mongoose");
const { authenticateUser } = require("./middlewares/UserAuthentication");
const User = require("./models/user");
const Blog =require('./models/blog')
mongooseConnect();
const app = express();

const PORT = 8004;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",authenticateUser,async  (req, res) => {
    try{
    const user=await User.findOne({_id:req.user.id})
    const blogs= await Blog.find({})
    // console.log(blogs)
        res.render("home",{
            user,
            blogs
        });
    }
    catch(Err){
   console.log(Err)
    }
});

app.use("/user", userRoute);
app.use("/blog",authenticateUser,blogRoute);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
