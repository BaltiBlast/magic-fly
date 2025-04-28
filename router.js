const express = require("express");
const router = express.Router();

const landingPageController = require("./controllers/landingPage.controller.js");
const { getLandingPage } = landingPageController;

router.get("/", getLandingPage);
router.post("/send-email-contact", (req, res) => {
  console.log("Received email:", req.body);
  res.redirect("/");
});

module.exports = router;
