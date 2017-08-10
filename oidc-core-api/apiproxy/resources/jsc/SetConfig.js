var login_path = '/oidc-sample/login';

var req_verb = context.getVariable('request.verb');
var req_scheme = context.getVariable('client.scheme');
var req_host = context.getVariable('request.header.host');
var req_query = context.getVariable('request.querystring');
var base_uri = req_scheme + "://" + req_host;
var login_req = base_uri + login_path + '?' + req_query;

context.setVariable('oidc.login_req', login_req);

var claims = {
  "sub": "A Friend",
  "email": "friend@gmail.com"
};
context.setVariable('oidc.claims_json', JSON.stringify(claims));
