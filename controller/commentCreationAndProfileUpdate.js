const User = require("../models/user");
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const profileShow = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const blogs = await Blog.find({ createdBy: req.user.id });
    return res.render("profile", { user, blogs });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const profileUpdate = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    return res.render("profileUpdate", {
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
const profileUpdateHandler = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user.id },
      {
        profileImage: req.file.buffer,
      }
    );
    return res.redirect("/user/profile");
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

const commentCreation = async (req, res) => {
  try {
    const newComment = await Comment.create({
      title: req.body.title,
      blogId: req.params.id,
      createdBy: req.user.id,
    });
    return res.redirect(`/blog/${req.params.id}`);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

module.exports = {
  profileShow,
  profileUpdate,
  profileUpdateHandler,
  commentCreation,
};
