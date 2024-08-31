const { Router } = require("express");
const {
  userSignUpHandler,
  userSignInHandler,
} = require("../controller/userCreation");
const { authenticateUser } = require("../middlewares/UserAuthentication");
const upload = require("../config/multer");
const {
  profileShow,
  profileUpdate,
  profileUpdateHandler,
  commentCreation,
} = require("../controller/commentCreationAndProfileUpdate");
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
router.get("/profile", authenticateUser, profileShow);

router.get("/profile/update", authenticateUser, profileUpdate);

router.post("/signup/create", userSignUpHandler);

router.post("/signin/create", userSignInHandler);

router.post(
  "/profile/update",
  authenticateUser,
  upload.single("profileImage"),
  profileUpdateHandler
);

router.post("/comment/:id", authenticateUser, commentCreation);

module.exports = router;
