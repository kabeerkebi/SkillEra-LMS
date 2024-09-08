const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOtpEmail } = require("../utils/email");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(201)
        .json({ message: "User already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const generateOTP = () => {
      return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user = new User({
      name: name || "No name mentioned",
      email,
      password: hashedPassword,
      isAdmin: false,
      otp,
      otpExpiry,
      isVerified: false,
    });
    await user.save();
    await sendOtpEmail(email, otp);

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      success: true,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ message: "Incorrect password", success: false });
    }

    // Check if OTP verification is required
    if (user.otp || user.otpExpiry) {
      if (Date.now() > user.otpExpiry) {
        const generateOTP = () => {
          return Math.floor(10000 + Math.random() * 90000).toString();
        };

        const newOtp = generateOTP();
        user.otp = newOtp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for another 10 minutes
        await user.save();
        await sendOtpEmail(email, otp);

        return res.status(200).json({
          message: "OTP expired. A new OTP has been sent to your email.",
          success: false,
          userId: user._id,
        });
      }

      // Prompt user to verify OTP
      return res.status(200).json({
        message:
          "OTP verification required. Please verify the OTP sent to your email.",
        success: false,
        userId: user._id,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Set the token in an HTTP-only cookie and respond with success
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      message: "Login successful",
      success: true,
      user: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error, please try again later", success: false });
  }
};

const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    if (user.isVerified) {
      return res.status(200).json({
        message: "User allready verify",
        success: false,
        redirect: true,
      });
    }
    // Check if OTP matches and is not expired
    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res
        .status(200)
        .json({ message: "Invalid or expired OTP", success: false });
    }

    // Clear OTP fields after successful verification
    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    // Generate JWT token after OTP is verified
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Set the token in an HTTP-only cookie and respond with success
    res.status(200).cookie("token", token, { httpOnly: true }).json({
      message: "OTP verified successfully. Login successful.",
      success: true,
      user: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  try {
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("adminToken", token, { httpOnly: true })
        .json({ message: "Admin login successful", token, success: true });
    } else {
      res
        .status(200)
        .json({ error: "Invalid admin credentials", success: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const promoteToAdmin = async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     user.isAdmin = true;
//     await user.save();
//     res.json({ message: "User promoted to admin successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const checkAuth = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.json({ error: "Unauthorized" });
  }
};

const checkAdminAuth = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(201).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ admin: decoded, success: true });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized", success: false });
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "Logout successful", success: true });
};

const adminLogout = (req, res) => {
  res
    .cookie("adminToken", "", { httpOnly: true, expires: new Date(0) })
    .json({ message: "Admin logout successful" });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", success: false });
    }
    const generateOTP = () => {
      return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const resetOtp = generateOTP();
    user.resetPasswordOtp = resetOtp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    await sendOtpEmail(email, resetOtp);

    res.status(200).json({
      message: "OTP sent to your email for password reset.",
      success: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error, please try again later", success: false });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.resetPasswordOtp !== otp) {
      return res.status(200).json({ message: "Invalid OTP", success: false });
    }

    if (Date.now() > user.resetPasswordOtpExpiry) {
      return res.status(200).json({ message: "OTP expired", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;
    await user.save();

    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error, please try again later", success: false });
  }
};

module.exports = {
  register,
  login,
  adminLogin,
  checkAuth,
  checkAdminAuth,
  logout,
  adminLogout,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
