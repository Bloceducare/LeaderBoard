const { request } = require('express');
const express = require('express');
const router = express.Router();
const userController = require("../controllers/index")


router.post("/users", (req, res, next) => {
    const {address, firstName, lastName} = req.body
    userController.addUser(
        address,
        firstName,
        lastName
    )
    res.json(
        {
            "status":201,
            "data": "some data"
        }
    )
})

router.get("/users", (req, res, next) => {
    const allUsers = userController.getUsers()
    res.json({
        "status":200,
        "data":JSON.stringify(allUsers)
    })
})

module.exports = router;