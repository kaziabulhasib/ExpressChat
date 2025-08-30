const express = require("express");
const { getUsers } = require("../controller/usersController");

const router = express.Router();

// users page

router.get("/", getUsers);

module.exports = router;
