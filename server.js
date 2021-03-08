const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const { google } = require('googleapis');
const sendGmail = require('./mailer');
const { gmail } = require('googleapis/build/src/apis/gmail');
const OAuth2 = google.auth.OAuth2;

const oauthCredentials = {
  clientId: "626565103176-hog4o85ivj07if2h1o7fe72dfvlo1its.apps.googleusercontent.com",
  clientSecret: "htAK62-61yYVwMKItfo_2tG6",
  refreshToken: "",
  redirect_uri: "http://localhost:3000/token",
  scope: ["https://mail.google.com/"]
}

const { clientId, clientSecret, redirect_uri, scope } = oauthCredentials;
const oauth2Client = new OAuth2( clientId, clientSecret, redirect_uri );

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.static('dist'))

app.get('/authorize', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope 
  })
  res.status(200).json({url})
})


app.get('/token', async (req, res) => {  
  const {code} =  req.query;
  const {tokens} = await oauth2Client.getToken(code);
  console.log({tokens})
  oauthCredentials.refreshToken = tokens.refresh_token;
  res.status(301).redirect(`/send-mail?token=${tokens.access_token}`)
})

app.post('/send-gmail', async (req, res) => {
  const {data} = req.body
  // console.log(req)
  await sendGmail(oauthCredentials, data)
    .then(response => {
      console.log(response)
      res.status(200).json({response});
    })
    .catch(error => {
      console.log({error})
      res.status(500).json({error});
    })
  

})

app.get('/send-mail', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

