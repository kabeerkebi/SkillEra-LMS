const express = require("express");
const {
  register,
  login,
  checkAuth,
  logout,
  adminLogin,
  checkAdminAuth,
  adminLogout,
  verifyOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyotp", verifyOtp);
router.post("/logout", logout);
router.get("/check", checkAuth);
router.post("/adminlogin", adminLogin);
router.post("/adminlogout", adminLogout);
router.get("/checkadmin", checkAdminAuth);
router.post("/forgotpassword", forgotPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
