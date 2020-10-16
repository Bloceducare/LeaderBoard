const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);


const User  = sequelize.define('user', {
    address : {
        type: DataTypes.STRING,
        unique: true,
    },
    firstName : {
        type: DataTypes.STRING,
        unique: true
    },
    lastName : {
        type: DataTypes.STRING,
    },
});

module.exports = {User}