// Set the below variables as per env
var client_id = '<App 1 Consumer Key>';
var client_secret = '<App 1 Consumer Secret>';
var scope = 'openid profile email';
var callback_path = '/oidc-sample/app1/callback';
var authorize_path = '/oidc-sample/oidc/authorize';
var token_path = 'oidc-sample/oidc/token';  // No leading '/'

var req_scheme = context.getVariable('client.scheme');
var req_host = context.getVariable('request.header.host');
var req_path = context.getVariable('request.path');
var base_uri = req_scheme + "://" + req_host;
var redirect_uri = base_uri + callback_path;
var authorize_uri = base_uri + authorize_path;
var current_uri = base_uri + req_path;
var state = { bookmark: current_uri };

context.setVariable('oidc.resource_host', req_host);
context.setVariable('oidc.token_path', token_path);

context.setVariable('oidc.redirect_uri', redirect_uri);
context.setVariable('oidc.authorize_uri', authorize_uri);

context.setVariable('oidc.client_id', client_id);
context.setVariable('oidc.client_secret', client_secret);

var params = 'client_id=' + client_id + '&' + 
             'redirect_uri=' + redirect_uri + '&' +
             'scope=' + scope + '&' +
             'state=' + JSON.stringify(state);
context.setVariable('oidc.authorize_req', authorize_uri + '?' + params);
