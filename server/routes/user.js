const {
  signin,
  signup,
  logout,
  getUser,
  addFeedback,
  getFeedback,
  getAdminStatics,
} = require("../controller/user");

const router = require("express").Router();

router.route("/login").post(signin);
router.route("/signup").post(signup);
router.route("/logout").get(logout);
router.route("/user").get(getUser);
router.route("/feedback").post(addFeedback).get(getFeedback); 
router.route('/admin/statistics').get(getAdminStatics)
module.exports = router;
