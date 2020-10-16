const models = require("../models")


const addUser = async (address, firstName, lastName) => {
    return await models.User.create({
        address: address,
        firstName: firstName,
        lastName: lastName
    })
} 

const getUsers = async () => {
    const allUsers = await models.User.findAll({raw:true})
    return allUsers
}

module.exports = {addUser, getUsers}