const express = require("express");
const router = express.Router();

const landingPageController = require("./controllers/landingPage.controller.js");
const { getLandingPage } = landingPageController;

router.get("/", getLandingPage);

module.exports = router;
