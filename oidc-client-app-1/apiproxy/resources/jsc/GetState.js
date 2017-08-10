var stateStr = context.getVariable('request.queryparam.state');
var stateObj = JSON.parse(stateStr);
context.setVariable('oidc.bookmark', stateObj.bookmark);