const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc test users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ test: "test data users" });
});

module.exports = router;
