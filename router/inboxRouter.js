const express = require("express");
const { getInbox } = require("../controller/inboxController");

const router = express.Router();

// inbox page

router.get("/", getInbox);

module.exports = router;
