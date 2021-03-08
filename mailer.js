const nodemailer = require('nodemailer');

module.exports = (config, data) => {
  console.log({config, data});
  const { clientId, clientSecret, refreshToken, accessToken, redirect_uri } = config;

   const mailConfig = {
        service: 'gmail',
        auth: {
            accessToken,
            type: "OAuth2",
            user: "wilsongaturu@gmail.com",
            clientId,
            clientSecret,
            refreshToken
          },
          tls: {
            rejectUnauthorized: false
          }
        } 
        const transporter = nodemailer.createTransport(mailConfig);
        const { subject, text, to, from } = data;
        return transporter.sendMail({ subject, text, to, from })
}