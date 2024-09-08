const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
  addToCart,
  viewCart,
  removeFromCart,
  clearUserCart,
} = require("../controllers/cartController");

router.post("/addtocart/:courseId", authMiddleware, addToCart);
router.post("/removecart", authMiddleware, removeFromCart);
router.delete("/clearcart", authMiddleware, clearUserCart);
router.get("/viewcart", authMiddleware, viewCart);
module.exports = router;
