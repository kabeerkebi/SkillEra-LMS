const User = require("../models/User");

const EnrollCourses = async (req, res) => {
  const userId = req.user.id;
  const { courseIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Convert courseIds to an array if it's not already
    const coursesToEnroll = Array.isArray(courseIds) ? courseIds : [courseIds];

    // Filter out courses that are already in the user's enrolledCourses
    const newCourses = coursesToEnroll.filter(
      (courseId) => !user.enrolledCourses.includes(courseId)
    );

    if (newCourses.length === 0) {
      return res.status(200).json({
        message: "Already enrolled in these courses",
        success: true,
      });
    }

    // Add new courses to the user's enrolledCourses array without duplicates
    user.enrolledCourses = [
      ...new Set([...user.enrolledCourses, ...newCourses]),
    ];

    await user.save();
    res.status(200).json({ message: "Enrolled successfully", success: true });
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
};

// Get all enrolled courses for a user
const GetAllCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("enrolledCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const IfEnrollCourses = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id; // Access the user ID from req.user

    if (!courseId) {
      return res
        .status(400)
        .json({ message: "Course ID not provided", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const checkEnrolled = user.enrolledCourses.some(
      (course) => course._id.toString() === courseId
    );

    if (checkEnrolled) {
      return res
        .status(200)
        .json({ message: "Course is enrolled", success: true });
    } else {
      return res
        .status(200)
        .json({ message: "Course is not enrolled", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//  to add preference
const setUserRatingPopupPreference = async (req, res) => {
  try {
    const userId = req.user.id; // Access the user ID from req.user
    const { preference } = req.body; // 'dontAskAgain', 'remindLater'
    const { courseId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingPreference = user.ratingPreferences.find(
      (p) => p.courseId.toString() === courseId
    );
    if (existingPreference) {
      existingPreference.preference = preference;
    } else {
      user.ratingPreferences.push({ courseId, preference });
    }
    await user.save();

    res.status(200).json({ message: "User preference updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user preference", error });
  }
};

const shouldShowRatingPopup = async (req, res) => {
  try {
    const userId = req.user.id; // Access the user ID from req.user
    const { courseId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const preference = user.ratingPreferences.find(
      (p) => p.courseId.toString() === courseId
    );
    let shouldShowPopup =
      !preference ||
      preference.preference === "" ||
      preference.preference === "remindLater";

    res.status(200).json({ shouldShowPopup });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user preference", error });
  }
};

const IfAddTocart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in req.user.id after authentication
    const courseId = req.params.id;

    // Fetch the user from the database
    const user = await User.findById(userId).populate("enrolledCourses");

    // Check if the user has already enrolled in the course
    const alreadyEnrolled = user.enrolledCourses.some(
      (course) => course._id.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(200).json({
        success: false,
        message: "You are already enrolled in this course.",
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "You can add this course to the cart." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  GetAllCourses,
  EnrollCourses,
  IfAddTocart,
  IfEnrollCourses,
  setUserRatingPopupPreference,
  shouldShowRatingPopup,
};
