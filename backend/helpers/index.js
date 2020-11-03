const jwt = require("jsonwebtoken")
const { config } = require("../config.js");
const {ethers} = require('ethers')


const validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res
          .status(401)
          .send({ status: 401, error: "unathorized, Invalid Token" });
      } else {
        req.jwt = jwt.verify(authorization[1], config.secret);
        return next();
      }
    } catch (err) {
      return res
        .status(403)
        .send({ status: 403, error: "Invalid token signature" });
    }
  } else {
    return res.status(401).send({ status: 401, error: "unathorized" });
  }
};


const assignJwtToken = async (address, role) => {
    return await jwt.sign(
        {
        payload: {
            address: address,
            role: role,
            sig: "kapson"
            }
        },
        config.secret,
    )
}

const checkValidSignature = async (signature, validatorAddress) => {
    const message = `Connecting to web3bridge leaderboard`;
    let address = await ethers.utils.verifyMessage(message, signature);
    if (address.toLowerCase() !== validatorAddress.toLowerCase()) {
        return false
    }
}

const generateOtp = () => {
    return Math.floor((Math.random() * 89999) + 10000);
}

module.exports={
    validJWTNeeded,
    assignJwtToken,
    checkValidSignature,
    generateOtp
}