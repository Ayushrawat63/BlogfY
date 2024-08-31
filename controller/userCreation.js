const User = require("../models/user");
const { jwtTokenCreation } = require("../services/authentication");

const userSignUpHandler = async (req, res) => {
  try {
    // console.log(req.body)
    let { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const payload = {
      id: newUser._id,
      role: newUser.role,
    };
    const token = jwtTokenCreation(payload);
    res.cookie("jwtToken", token);
    return res.redirect("/");
  } catch (err) {
     return res.render('signin',{error:err.message})
  }
};

const userSignInHandler = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.matchPassword(email, password);
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwtTokenCreation(payload);
    res.cookie("jwtToken", token);
    return res.redirect("/");
  } catch (err) {
    if(err){
      return res.render('signin',{error:"Email or Password is wrong"})
    }   
  }
};

module.exports = {
  userSignInHandler,
  userSignUpHandler,
};
