const express = require("express");
const router = express.Router();

const landingPageController = require("./controllers/landingPage.controller.js");
const { getLandingPage, postContactFormOnLandingPage } = landingPageController;

router.get("/", getLandingPage);
router.post("/send-email-contact", postContactFormOnLandingPage);

module.exports = router;
