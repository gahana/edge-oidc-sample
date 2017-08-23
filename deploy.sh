#!/bin/bash

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
USAGE="Usage: deploy [all|oidc|login|app1|app2]"
ORG="org-env"
ENV="dev"

if [ -z "$1" ]; then
	set -- "all"
fi
set -eu

cd $BASEDIR

if [ "$1" = "oidc" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oidc-core-api -d ./oidc-core-api
fi

if [ "$1" = "login" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oidc-login-app -d ./oidc-login-app -R	
fi

if [ "$1" = "app1" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oidc-client-app-1 -d ./oidc-client-app-1
fi

if [ "$1" = "app2" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oidc-client-app-2 -d ./oidc-client-app-2
fi

