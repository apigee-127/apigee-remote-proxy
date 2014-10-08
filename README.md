Apigee Remote Proxy Setup
=========================

By deploying the Apigee Remote Proxy to Apigee, you can run code locally that communicates with Apigee in the cloud. 
To do this, you deploy a special API proxy to the cloud, which gives you a dedicated API that your local server can use 
to invoke various Apigee functions like Quota, Cache, OAuth, Analytics, and the like.

1. Install the apigee-remote-proxy npm module
---------------------------------------------
The easiest way to provision the proxy to Apigee and to use the Node.js functionality is to use this module:

    npm install -g apigee-remote-proxy

This will install apigee-remote-proxy on your local system so that you can run "deployApigeeRemoteProxy" from your path 
at any time.

2. Create an Apigee Account
---------------------------
If you don't have your own installation of Apigee Enterprise, or don't have an Apigee Edge Account, 
then [go to Apigee Enterprise](http://enterprise.apigee.com) and make one. You'll need to know three things:

* Your user name (typically your email address)
* Your password
* Your organization name

3. Deploy the Proxy
-------------------

You can now deploy the proxy to your environment using deployApigeeRemoteProxy like this:

    deployApigeeRemoteProxy -b https://api.enterprise.apigee.com -o ORGANIZATION -u USERNAME -p PASSWORD -e ENVIRONMENT

NOTE: Replace ORGANIZATION, USERNAME, PASSWORD, and ENVIRONMENT with your Apigee account info.

Alternatively, you may omit and or all the parameters and deployApigeeRemoteProxy will prompt you for them. 

3. Verify the Proxy (optional)
------------------------------

Once the proxy had been deployed, then you can invoke the proxy at the URL:

    https://ORGANIZATION-test.apigee.net/apigee-remote-proxy
    
(Replace ORGANIZATION with your Apigee organization name)

If you access this URL right now, you should get a 401 (Unauthorized) error because you didn't
supply an API key. (If deployment failed, you will get a 404.)
