const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const paymentController = require("../controllers/paymentController")
const router = express.Router();
router.post("/check", paymentController);

module.exports = router;
