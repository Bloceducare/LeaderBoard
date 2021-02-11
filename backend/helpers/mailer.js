const nodemailer = require("nodemailer");

const sendMail = async (toEmail, text) => {
 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });


  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: toEmail,
    subject: "Welcome to the web3bridge leaderboard", 
    text: text, 
    // html: "<b>Hello world?</b>", 
  });

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  return true
}

module.exports={
    sendMail
}