const { Router } = require("express");
const {
  userSignUpHandler,
  userSignInHandler,
} = require("../controller/userCreation");
const User = require("../models/user");
const Comment = require("../models/comment");
const { authenticateUser } = require("../middlewares/UserAuthentication");
const upload = require("../config/multer");
const Blog = require("../models/blog");
const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/logout", (req, res) => {
  res.cookie("jwtToken", "");
  return res.redirect("/user/signin");
});
router.get("/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const blogs = await Blog.find({ createdBy: req.user.id });
    return res.render("profile", { user, blogs });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

router.get("/profile/update", authenticateUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    return res.render("profileUpdate", {
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

router.post("/signup/create", userSignUpHandler);

router.post("/signin/create", userSignInHandler);

router.post(
  "/profile/update",
  authenticateUser,
  upload.single("profileImage"),
  async (req, res) => {
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
  }
);

router.post("/comment/:id", authenticateUser, async (req, res) => {
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
});

module.exports = router;
