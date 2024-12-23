const express = require("express");
const router = express.Router()
const { contactUsController } = require("../controllers/ContectUs");

router.post("/contact", contactUsController)

module.exports = router