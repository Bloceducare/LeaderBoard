const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);


const Account  = sequelize.define('account', {
    address : {
        type: DataTypes.STRING,
        unique: true,
    },
    firstName : {
        type: DataTypes.STRING,
    },
    lastName : {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    role: {
        type: DataTypes.INTEGER
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    totalPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateRegistered: {
        type: DataTypes.DATE
    }
});

const Points = sequelize.define('points', {
    pointsAwarded: {
        type: DataTypes.INTEGER
    },
    reasonAwarded: {
        type: DataTypes.STRING
    },
    dateAwarded: {
        type: DataTypes.DATE
    }
})

Points.belongsTo(Account);
Account.hasMany(Points)

module.exports = {Account, Points}