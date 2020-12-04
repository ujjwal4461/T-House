const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/authController");
const {getUserById} = require("../controllers/userController")
const { getToken, processPayment } = require("../controllers/paymentController");


router.get("/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

router.param("userId", getUserById);

module.exports = router;
