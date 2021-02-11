const { request } = require('express');
const express = require('express');
const router = express.Router();
const {
    addUser, 
    getUsers, 
    authenticateUser,
    getNewToken,
    activateAccount
} = require("../controllers/index")

const {
    getLeaderboard
} = require("../controllers/leaderboard")

router.post("/auth", authenticateUser)

router.post("/auth/reset_otp", getNewToken)

router.post("/auth/activate", activateAccount)

router.post("/users", addUser)

router.get("/users", getUsers)

router.get("/leaderboard", getLeaderboard)

module.exports = router;