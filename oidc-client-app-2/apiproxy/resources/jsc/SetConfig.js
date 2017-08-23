// Set the below variables as per env
var client_id = '<App 2 Consumer Key>';
var client_secret = '<App 2 Consumer Secret>';
var scope = 'openid profile email';
var callback_path = '/oidc-sample/app2/callback';
var authorize_path = '/oidc-sample/oidc/authorize';
var resource_path = 'oidc-sample/app2/resource'; // No leading '/''
var token_path = 'oidc-sample/oidc/token';  // No leading '/'

var req_verb = context.getVariable('request.verb');
var req_scheme = context.getVariable('client.scheme');
var req_host = context.getVariable('request.header.host');
var req_path = context.getVariable('request.uri');
var base_uri = req_scheme + "://" + req_host;
var redirect_uri = base_uri + callback_path;
var authorize_uri = base_uri + authorize_path;
var current_uri = req_host + req_path;  // HTTPTargetConnection in ServiceCallout does not allow full variable for URL
var state = { bookmark: current_uri };

context.setVariable('oidc.resource_host', req_host);
context.setVariable('oidc.resource_path', resource_path);
context.setVariable('oidc.token_path', token_path);

context.setVariable('oidc.redirect_uri', redirect_uri);
context.setVariable('oidc.authorize_uri', authorize_uri);

context.setVariable('oidc.client_id', client_id);
context.setVariable('oidc.client_secret', client_secret);
context.setVariable('oidc.scope', scope);
context.setVariable('oidc.state', JSON.stringify(state));

var params = 'client_id=' + client_id + '&' + 
             'redirect_uri=' + redirect_uri + '&' +
             'scope=' + scope + '&' +
             'state=' + JSON.stringify(state);
context.setVariable('oidc.authorize_req', authorize_uri + '?' + params);