const { request } = require('express');
const express = require('express');
const router = express.Router();
const {
    addUser, 
    getUsers, 
    authenticateUser
} = require("../controllers/index")

const {
    getLeaderboard
} = require("../controllers/leaderboard")

router.post("/auth", authenticateUser)

router.post("/users", addUser)

router.get("/users", getUsers)

router.get("/leaderboard", getLeaderboard)

module.exports = router;