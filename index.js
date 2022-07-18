const express = require("express");
const { json } = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});

let mailOptions = {
  from: "osatohanmenogbeide1@gmail.com",
  to: "osatohanmenogbeide1@gmail.com",
  subject: "Nodemailer Project",
  text: "Hi from from your Nodemailer Project"
}

const app = express();

app.use(json());


app.get("/send", (req,res) => {
  transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
      console.log("Error " + err)
    } else {
      console.log("Email sent successfully")
    }
  })
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
