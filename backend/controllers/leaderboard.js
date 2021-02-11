const {Account, Points} = require("../models")

const getLeaderboard = async (request, response) => {
    try {
        const allUsers = await Account.findAll({
            where:{
                active: true
            }
        })
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



module.exports = {getLeaderboard}