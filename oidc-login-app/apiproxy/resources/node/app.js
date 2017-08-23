var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var AUTH_URL = 'https://org-env.apigee.net/oidc-sample/oidc/authcode';

var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('login', { 
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri,
    scope: req.query.scope,
    state: req.query.state,
    app_name: req.query.app_name
  });
});

app.post('/', function(req, res) {
  if ("friend" === req.body.username) {
    console.log("Scope list: " + req.body.scope);
    res.render('consent', { 
      scopeList: req.body.scope.split(" "),
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri,
      scope: req.body.scope,
      state: req.body.state,
      app_name: req.body.app_name
    });
  } else {
    res.status(401).send("Only a friend can enter");
  }
});

app.post('/consent', function(req, res) {
  if ("allow" === req.body.consent) {
    getAuthCode(req, res);
  } else {
    res.status(401).send("User denied consent");
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
