const express = require("express");
const router = express.Router();
const detectController = require("../controllers/detectController");

router.post("/detect-scam", detectController);

module.exports = router;