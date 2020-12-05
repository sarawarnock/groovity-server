const path = require("path");
const express = require("express");
const { json } = require("express");

const authRouter = express.Router();
const jsonParser = express.json();

//need to install
const querystring = require("querystring");
const redirect_uri = process.env.REDIRECT || "http://localhost:8000/callback";

// app.get('/login', function(req, res) {
//     res.redirect('https://accounts.spotify.com/authorize?' +
//       querystring.stringify({
//         client_id: process.env.SPOTIFY_CLIENT_ID,
//         response_type: 'code',
//         scope: 'user-read-private user-read-email',
//         redirect_uri
//     }))
// })

authRouter.get('/login', async (req, res, next) => {
  try {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          client_id: process.env.SPOTIFY_CLIENT_ID,
          response_type: "code",
          scope: "user-read-private user-read-email",
          redirect_uri,
        })
    );
    return next();
  } catch (err) {
    //handled by error handling middleware
    return next(err);
  }
})

// app.get("/callback", function (req, res) {
//   let code = req.query.code || null;
//   let authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     form: {
//       code: code,
//       redirect_uri,
//       grant_type: "authorization_code",
//     },
//     headers: {
//       Authorization:
//         "Basic " +
//         new Buffer(
//           process.env.SPOTIFY_CLIENT_ID +
//             ":" +
//             process.env.SPOTIFY_CLIENT_SECRET
//         ).toString("base64"),
//     },
//     json: true,
//   };
//   //change this!!!!!! request has been deprecated
//   request.post(authOptions, function (error, response, body) {
//     var access_token = body.access_token;
//     let uri = process.env.FRONTEND_URI || "http://localhost:3000";
//     res.redirect(uri + "?access_token=" + access_token);
//   });
// });

authRouter.get('/callback', async (req, res, next) => {
  try {
    let code = req.query.code || null;
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };
    //change this!!!!!! request has been deprecated
    request.post(authOptions, function (error, response, body) {
      var access_token = body.access_token;
      let uri = process.env.FRONTEND_URI || "http://localhost:3000";
      res.redirect(uri + "?access_token=" + access_token);
    });
    return next();
  }
  catch (err) {
      return next(err);
  }
})

//authRouter.get({ path: `/login`, version: "1.0.0" }, getCredentials);
//authRouter.get({ path: `/callback`, version: "1.0.0" }, getCallback);

module.exports = authRouter
