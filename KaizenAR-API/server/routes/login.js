const express = require('express');
var router = express.Router();

var OAuth = require('oauth').OAuth
var url = require('url')


const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";

const appName = "Kaizen Augmented Reality";

/* TODO: INSERT KEY OR SECRET */
const key = "";
const secret = "";

const oauth_secrets = {};
/* TODO: INSERT Login Callback URL */
const loginCallback = '';

const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");

const login = function(request, response) {

  oauth.getOAuthRequestToken(function(error, token, tokenSecret, results){
    oauth_secrets[token] = tokenSecret;
    response.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}`);
  });
};

var callback = function(req, res) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token;
  const tokenSecret = oauth_secrets[token];
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results){

    oauth.getProtectedResource("https://api.trello.com/1/members/me", "GET", accessToken, accessTokenSecret, function(error, data, response){

      const id = JSON.parse(data).id;
      /* TODO: INSERT URL REDIRECT*/
      res.redirect(`...../login/result/${id}`);
    });
  });
};


router.get("/", function (request, response) {
  login(request, response);
});

router.get("/callback", function (request, response) {
  callback(request, response);
});

router.get("/result/:id", function (request, response) {
  response.send("Logged On");
});

module.exports = router;