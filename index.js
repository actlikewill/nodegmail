const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// const oauthCredentials = {
//   clientId: "626565103176-hog4o85ivj07if2h1o7fe72dfvlo1its.apps.googleusercontent.com",
//   clientSecret: "htAK62-61yYVwMKItfo_2tG6",
//   refresh_token: "1//0404kWBkPc36sCgYIARAAGAQSNwF-L9Irz-HMmpM_i16i7X-BsPAGNejNbHihhxANSy0ol0wbpjgZH3xnkvONcGFSGW7b-kK9M74",
//   redirect_uri: "https:/developers.google.com/oauthplayground"
// }

const oauthCredentials = {
  clientId: "626565103176-hog4o85ivj07if2h1o7fe72dfvlo1its.apps.googleusercontent.com",
  clientSecret: "htAK62-61yYVwMKItfo_2tG6",
  refresh_token: "",
  redirect_uri: "http://localhost:3000/token",
  scope: ["https://mail.google.com/"]
}

async function getAccessToken () {
const { clientId, clientSecret, refresh_token, redirect_uri, scope } = oauthCredentials;
const oauth2Client = new OAuth2( clientId, clientSecret, redirect_uri );
// oauth2Client.setCredentials({ refresh_token })
// const accessToken = await new Promise((resolve, reject) => {
//       oauth2Client.getAccessToken((err, token) => {
//         if(err) {
//           reject(err);        
//         } else {
//           resolve(token)
//         }
//       })
//   });

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope 
  })

  return url;
}

getAccessToken().then(r => console.log(r)).catch(error => console.log({error}))