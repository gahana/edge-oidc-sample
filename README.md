# OpenID Connect flow with Apigee Edge

## Introduction
This is a sample project to demonstrate the `authorization code` flow of [OpenID Connect](http://openid.net/specs/openid-connect-core-1_0.html) on [Apigee Edge](https://apigee.com/api-management). For a nice summary of steps involved in authorization code flow, see Apigee Edge [docs](http://docs.apigee.com/api-services/content/oauth-v2-policy-authorization-code-grant-type#flowdiagram).

## Prerequisites
- Install [NodeJS](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/).
- Install [apigeetool](https://github.com/apigee/apigeetool-node) to package and deploy API proxy.

## Install
`git clone https://github.com/gahana/edge-oidc-sample.git` or download this repository.

Set your Apigee Edge username and password in environment variables

```
$ export EDGE_USERNAME=<Apigee Edge Username>
$ export EDGE_PASSWORD=<Apigee Edge Password>
```

Update Edge organization and environment in `deploy.sh` file

```
ORG="org name"
ENV="env name"
```

Configuration settings:
- `deploy.sh` : Update `ORG` and `ENV` environment variables to your Apigee Edge organization and environment
- `oidc-login-app/apiproxy/resources/node/app.js` : Update `AUTH_URL` variable with your Apigee Edge organization and environment
- Deploy `oidc-core-api` proxy first with `$ ./deploy.sh oidc`
- Create an API product `oidc-product` with access to all resources (`/**`) in `oidc-core-api` proxy
- Create two applications `client-app-` and `client-app-2` based on the above API product. Create developer if needed.
- The applications should have callback URL `https://org-env.apigee.net/oidc-sample/app1/callback` and `https://org-env/oidc-sample/app2/callback`
- Update the `Consumer Key` and `Consumer Secret` of these two apps as `client_id` and `client_secret` on `apiproxy/resources/jsc/SetConfig.js` file in `oidc-client-app-1` and `oidc-client-app-1`
- Optionally, update the `claims` variable in `oidc-core-api/apiproxy/resources/jsc/SetConfig.js` but make sure the `sub` claims is present.

To deploy proxies. (Make sure `deploy.sh` file has execution privileges.)

```bash
$ ./deploy.sh all	# deploy all proxies

$ ./deploy.sh oidc  # deploy oidc-core-api

$ ./deploy.sh login  # deploy oidc-login-app

$ ./deploy.sh app1  # deploy oidc-client-app-1

$ ./deploy.sh app2  # deploy oidc-client-app-2
```

## Running
1. Go to browser and access `oidc-client-app-1` resource with URL `https://<org>-<env>.apigee.net/oidc-sample/app1/resource`. Since this is without the JWT, it redirects to `oidc-login-app` via `oidc-core-api`.
2. Enter `friend` and login. You'll be authenticated, authorized and state restored to see the result of the original resource `https://<org>-<env>.apigee.net/oidc-sample/app1/resource`. I.E. if you see `OIDC Web App 1` on the page then the demo worked!
3. You can do the same with `oidc-client-app-2` to demonstrate that any number of applications can be onboarded to this setup without having to redo the authentication and authorization part.

## Notes
`oidc-client-app-1` and `oidc-client-app-2` here are mocks for common web/mobile applications with a server side to it. They interacto with `oidc-core-api` for all authentication and authorization. `oidc-login-app` is the mock ID provider used by `oidc-core-api` to provide JWT tokens to client applications.
Here `oidc-login-app`, `oidc-client-app-1` and `oidc-client-app-2` are mock implementations 
