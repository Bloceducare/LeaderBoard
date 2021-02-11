const {Account} = require("../models")
const { response } = require("express")
const {
    checkValidSignature, 
    assignJwtToken, 
    generateOtp
} = require('../helpers')

const {sendMail} = require('../helpers/mailer')


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

const getNewToken = async (request, response) => {
    try {
        const {address} = request.body
        const account = await Account.findOne({
            where:{
                address: address
            }
        })
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
        try{
            const otp = generateOtp()
            const updatedOtp = await Account.update({
                otp: otp
            }, {
                where: {address: address}
            })
            const text = "Your one time password is " + otp
            const email = "kapsonkatongole@gmail.com"
            const mail = await sendMail(email, text)
            console.log(mail)
            return response.status(200).json({
                "status":200,
                "message":"otp successfully reset"
            })
        }catch (error){
            console.log(error)
            return response.status(500).json({
                "status":500,
                "message":"Internal Server Error"
            })
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            "status":500,
            "message":"Internal Server Error"
        })
    }
}

const activateAccount = async (request, response) => {
    try{
        const {address, otp} = request.body
        const account = await Account.findOne({
            where:{
                address: address
            }
        })
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

        if (account.otp !== parseInt(otp)) {
            return response.status(400).json({
                "status":400,
                "message":"Bad or expired otp"
            })
        } else {
            try {
                const activate = await Account.update({
                    active: true
                }, {
                    where: {address: address}
                })
                return response.status(200).json({
                    "status":200,
                    "data":account
                })
            } catch (error) {
                
            }
        }

    } catch (error){
        return response.status(500).json({
            "status":500,
            "message":"Internal Server Error"
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

module.exports = {addUser, getUsers, authenticateUser, getNewToken, activateAccount}