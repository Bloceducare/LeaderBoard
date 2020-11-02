const {Account} = require("../models")
const { response } = require("express")
const {checkValidSignature, assignJwtToken} = require('../helpers')


const authenticateUser = async (request, response) => {
    try {
        const {address, signature} = request.body
        const account = await Account.findOne(
            {where: {address: address}}
        ) 
        if (typeof account === "undefined" || account === null){
            return response.status(404).json({
                "status":404,
                "message": "Account not found"
            })
        }else{
            if (!account instanceof Account) {
                return response.status(404).json({
                    "status":404,
                    "message":"Account not found"
                })
            }
        }
        const validSignature = await checkValidSignature(signature, account.address)
        if(validSignature===false){
            return response.status(400).json({
                "status":400,
                "message":"Bad signature"
            })
        }else{
            const token = await assignJwtToken(account.address, account.role)
            return response.status(200).json({
                "status":200,
                "token": token,
                "data": account
            })
        }
    } catch(error) {
        return response.status(500).json({
            "status":500,
            "message":"Internal Server Error"
        })
    }
}

const addUser = async (request, response) => {
    try {
        const {address, firstName, lastName, email, role} = request.body
        let now = new Date();
        const user = await Account.create({
            address: address,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            dateRegistered: now
        })
        if(user){
            return response.json({
                "status":201,
                "data": user
            })
        }else {
            return response.json({
                "status":400,
                "error": "Bad data"
            })
        }
    } catch (error) {
        return response.json({
            "status":400,
            "error": "duplicate address or email"
        })
    }
} 

const getUsers = async (request, response) => {
    try {
        const allUsers = await Account.findAll({raw:true})
        return response.json({
            "status":200,
            "data":allUsers
        })
    } catch (error) {
        return response.json({
            "status":500,
            "error":error
        })
    }
    
}

module.exports = {addUser, getUsers, authenticateUser}