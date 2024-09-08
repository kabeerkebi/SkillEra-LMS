// controllers/cartController.js
const Cart = require("../models/Cart");
const Courses = require("../models/Courses");
const User = require("../models/User");

const addToCart = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id; // Access the user ID from req.user
  try {
    const course = await Courses.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ message: "Course not found", success: false });
    }

    // Find the user's document
    const user = await User.findById(userId).populate("enrolledCourses");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check if the course is already enrolled
    if (user.enrolledCourses.some((course) => course.equals(courseId))) {
      return res.status(200).json({
        message: "You have already enrolled in this course",
        enrolled: true,
      });
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, courses: [] });
    }

    // Check if the course is already in the cart
    if (cart.courses.includes(courseId)) {
      return res
        .status(200)
        .json({ message: "Course is already in the cart", have: true });
    }

    // Add the course to the cart
    cart.courses.push(courseId);
    await cart.save();

    res.status(200).json({ message: "Course added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove course from cart
const removeFromCart = async (req, res) => {
  const { courseId } = req.body; // courseId is a single number
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Log the cart state before removal
    console.log("Cart before removal:", cart);

    // Filter out the course to remove it from the cart
    cart.courses = cart.courses.filter(
      (course) => course.toString() !== courseId.toString()
    );

    // Log the cart state after removal
    console.log("Cart after removal:", cart);

    // Save the updated cart
    await cart.save();

    // Respond with success
    res
      .status(200)
      .json({ message: "Course removed from cart", success: true });
  } catch (error) {
    console.error("Error removing course from cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// View cart
const viewCart = async (req, res) => {
  const userId = req.user.id; // Access the user ID from req.user

  try {
    const cart = await Cart.findOne({ user: userId }).populate("courses");
    if (!cart) {
      return res.json({ message: "Cart not found", success: false });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const clearUserCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Ensure the cart is cleared only if it has items
    if (cart.courses.length > 0) {
      cart.courses = [];
      await cart.save();
    }

    res.status(200).json({ message: "Cart cleared successfully", success: true });
  } catch (err) {
    res.json({ message: err.message });
  }
};



module.exports = { addToCart, removeFromCart, viewCart, clearUserCart };
