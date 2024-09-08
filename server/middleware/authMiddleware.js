const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user information to req.user
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
