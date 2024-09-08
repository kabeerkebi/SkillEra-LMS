const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const {
  PostCourses,
  SearchedResult,
  Searching,
  RelatedCourse,
  AllCourses,
  Ratting,
  AverageRatings,
  GetOneCourse,
  FindLessonsInCourse,
  FindCategory,
  AdminAllCourses,
  DeleteCourse
} = require("../controllers/courseController");
const router = express.Router();
const upload = require("../middleware/multer");
router.post(
  "/postcourse",
  upload.fields([
    { name: "videos", maxCount: 10 },
    { name: "profilePicture", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  PostCourses
);
router.get("/findcategory", FindCategory);
router.get("/searched", SearchedResult);
router.get("/searching", Searching);
router.get("/related/:id", RelatedCourse);
router.get("/allcourse", AllCourses);
router.post("/rate/:courseId", authMiddleware, Ratting);
router.get("/:courseId/rating", AverageRatings);
router.get("/:courseId", GetOneCourse);
router.get("/lesson/:lessonId", FindLessonsInCourse);
router.get("/admin/allcourses", AdminAllCourses);
router.post("/admin/delete/:courseId", DeleteCourse);


module.exports = router;
