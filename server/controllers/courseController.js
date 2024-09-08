const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Course = require("../models/Courses");
const User = require("../models/User");
const { log } = require("console");

cloudinary.config({
  cloud_name: "dayjanr1f",
  api_key: "155422955373476",
  api_secret: "snFxhDVaqCGvWvDkBqHqvATTebk",
});

const uploadFileToCloudinary = async (filePath, resourceType, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: resourceType,
      folder: folder,
    });
    fs.unlinkSync(filePath); // Remove local file
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload error: ${error.message}`);
  }
};

const PostCourses = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files provided",
    });
  }

  try {
    const profilePictureResult = await cloudinary.uploader.upload(
      req.files.profilePicture[0].path,
      { resource_type: "image", folder: "skillera" }
    );
    const thumbnailResult = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      { resource_type: "image", folder: "skillera" }
    );

    // Remove the files from the server after uploading to Cloudinary
    fs.unlink(req.files.profilePicture[0].path, (unlinkErr) => {
      if (unlinkErr) console.error(unlinkErr);
    });
    fs.unlink(req.files.thumbnail[0].path, (unlinkErr) => {
      if (unlinkErr) console.error(unlinkErr);
    });

    const uploadPromises = req.files.videos.map((file) => {
      const filePath = file.path;
      return cloudinary.uploader
        .upload(filePath, { resource_type: "video", folder: "skillera" })
        .then((result) => {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) console.error(unlinkErr);
          });
          return result;
        })
        .catch((err) => {
          console.error("Cloudinary upload error:", err);
          return { error: err };
        });
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((result) => !result.error);
    const failedUploads = results.filter((result) => result.error);

    const uploadedUrls = successfulUploads.map((upload) => upload.secure_url);

    const newCourse = new Course({
      profilePicture: profilePictureResult.secure_url,
      thumbnail: thumbnailResult.secure_url,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      level: req.body.level,
      language: req.body.language,
      duration: req.body.duration,
      instructorName: req.body.instructorName,
      bio: req.body.bio,
      price: req.body.price,
      publishDate: req.body.publishDate,
      lessons: uploadedUrls.map((url, index) => ({
        description: req.body.descriptions[index], // Assuming descriptions are sent in the body
        videos: url,
      })),
    });

    await newCourse.save();

    res.status(200).json({
      success: true,
      message: "Course uploaded successfully",
      data: {
        successfulUploads,
        failedUploads,
      },
    });
  } catch (err) {
    console.error("Error uploading course:", err); // Detailed error log
    res.status(500).json({
      success: false,
      message: "Error uploading course",
      error: err,
    });
  }
};

// filter the courses

const SearchedResult = async (req, res) => {
  try {
    const { category, levels, averageRating } = req.query; // Extract category and levels from query parameters
    let filter = {};

    // Handle category-based filtering
    if (category) {
      filter.category = { $regex: category, $options: "i" }; // Case-insensitive search
    }
    if (averageRating) {
      filter.averageRating = { $eq: averageRating }; // Equal to
    }

    // Handle level-based filtering if levels are provided
    if (levels) {
      const levelArray = levels.split(","); // Assuming levels are provided as a comma-separated string
      filter.level = { $in: levelArray }; // Match any of the provided levels
    }

    // Find main courses that match the search query, or all courses if no filters are applied
    const mainCourses = await Course.find(filter);

    // Collect categories of the main courses to find related courses
    // const categories = mainCourses.map((course) => course.category);

    // Find related courses in the same categories, excluding the main courses
    // const relatedCourses = await Course.find({
    //   category: { $in: categories },
    //   _id: { $nin: mainCourses.map((course) => course._id) }, // Exclude main courses from related
    // });

    // Respond with main and related courses
    res.status(200).json({ mainCourses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for searching time see the all corses title
const Searching = async (req, res) => {
  try {
    const { title } = req.query;

    const courses = await Course.find({
      title: { $regex: new RegExp(title, "i") },
    });

    const uniqueTitles = [];
    const uniqueCourses = courses.filter((course) => {
      if (uniqueTitles.includes(course.title)) {
        return false;
      } else {
        uniqueTitles.push(course.title);
        return true;
      }
    });

    res.status(200).json(uniqueCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get related courses by course ID
const RelatedCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const findTheId = await Course.findById(id);

    if (!findTheId) {
      return res.status(404).json({ message: "Course not found" });
    }

    const categories = findTheId.category;

    const relatedCourses = await Course.find({
      category: { $in: categories },
      _id: { $nin: [findTheId._id] },
    });

    res.status(200).json(relatedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const AllCourses = async (req, res) => {
  try {
    const response = await Course.find({});
    res.status(200).json({ message: "sucess", response });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
// for add ratting
const Ratting = async (req, res) => {
  try {
    const { rating } = req.body;
    const { courseId } = req.params;
    const userId = req.user.id; // Access the user ID from req.user

    const user = await User.findById(userId).populate("enrolledCourses");
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user.enrolledCourses.some((c) => c._id.toString() === courseId)) {
      return res
        .status(403)
        .json({ message: "You are not enrolled in this course" });
    }

    const existingRating = course.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      course.ratings.push({ userId, rating });
    }

    const totalRatings = course.ratings.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = totalRatings / course.ratings.length;

    await course.save();

    res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: course.averageRating,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit rating", error });
  }
};

// to get  average ratting
const AverageRatings = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const userAverageRating = course.averageRating;
    res.status(200).json({ userAverageRating });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rating", error });
  }
};

// to get course with id

const GetOneCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const respons = await Course.findById(courseId);

    if (!respons) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(respons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message }); // Proper error handling
  }
};

const FindLessonsInCourse = async (req, res) => {
  try {
    const { lessonId } = req.params;

    // Find the course containing the lesson
    const course = await Course.findOne({ "lessons._id": lessonId });

    if (!course) {
      return res.status(404).json({ message: "Course or lesson not found" });
    }

    // Get all lessons from the found course
    const lessons = course.lessons.id(lessonId);

    return res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const FindCategory = async (req, res) => {
  try {
    let {
      category,
      page = 1,
      limit = 10,
      sortBy = "publishDate",
      order = "desc",
    } = req.query;

    if (category === "") {
      category = "Webdevelopment"; // Set default category if empty
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { [sortBy]: order === "asc" ? 1 : -1 },
    };

    // Fetch courses with pagination
    const courses = await Course.paginate({ category }, options);

    return res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const AdminAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}); // This retrieves all documents from the 'Course' collection

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res
      .status(200)
      .json({ message: "Courses retrieved successfully", courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};

const DeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId; // Extract the course ID from the request parameters
    console.log("Course ID received:", courseId); // Log the received ID

    // Validate course ID
    if (!courseId) {
      return res
        .status(200)
        .json({ message: "Course ID is required", success: false });
    }

    // Find the course by ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return res
        .status(200)
        .json({ message: "Course not found", success: false });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      deletedCourse,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      message: "Server error. Could not delete course",
      error,
      success: false,
    });
  }
};

module.exports = {
  PostCourses,
  SearchedResult,
  Searching,
  RelatedCourse,
  AllCourses,
  Ratting,
  AverageRatings,
  FindLessonsInCourse,
  GetOneCourse,
  FindCategory,
  AdminAllCourses,
  DeleteCourse,
};
