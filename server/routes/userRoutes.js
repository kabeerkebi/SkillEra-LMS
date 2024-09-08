const express = require("express");
const {
  GetAllCourses,
  EnrollCourses,
  IfAddTocart,
  IfEnrollCourses,
  shouldShowRatingPopup,
  setUserRatingPopupPreference,
} = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getallenroll", authMiddleware  , GetAllCourses);
router.post("/enroll",authMiddleware, EnrollCourses);
router.get("/ifaddtocart/:courseId", IfAddTocart);
router.get("/ifenrollcourses/:courseId", authMiddleware, IfEnrollCourses);
router.get("/showratingpopup/:courseId", authMiddleware, shouldShowRatingPopup);
router.post(
  "/setratingpreference/:courseId",
  authMiddleware,
  setUserRatingPopupPreference
);

module.exports = router;
