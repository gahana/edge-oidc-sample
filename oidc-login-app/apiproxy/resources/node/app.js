var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var AUTH_URL = 'https://srinisref-test.apigee.net/oidc-sample/oidc/authcode';

var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('login', { 
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri,
    scope: req.query.scope,
    state: req.query.state
  });
});

app.post('/', function(req, res) {
  if ("friend" === req.body.username) {
    getAuthCode(req, res);
  } else {
    res.status(401).send("Only a friend can enter");
  }
});

function getAuthCode(parentRequest, parentResponse) {
  console.log(parentRequest);
  request(authCodeOptions(parentRequest), function(error, response, body) {
      console.log("AuthCodeResponseError: " + error);
      console.log("AuthCodeResponseStatus: " + response.statusCode);
      console.log("AuthCodeResponseBody: " + body);
      if (!error && response.statusCode == 200) {
        parentResponse.redirect(parentRequest.body.redirect_uri + '?code=' + JSON.parse(body).auth_code + '&state=' + parentRequest.body.state);
      } else {
        parentResponse.status(401).send("Unable to get authorization code: " + error);
      }
  });
}

function authCodeOptions(request) {
  var params = {};
  params.response_type = 'code';
  params.client_id = request.body.client_id;
  params.redirect_uri = request.body.redirect_uri;
  params.scope = request.body.scope;
  params.state = request.body.state;
  return {
    url: AUTH_URL,
    method: 'POST',
    qs: params
  };
}

app.get('/hello', function(req, res) {
  res.send("Hello World!");
});

app.listen(9000);
