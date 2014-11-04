#!/usr/bin/env node
/****************************************************************************
 The MIT License (MIT)

 Copyright (c) 2014 Apigee Corporation

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
'use strict';

var options = require('commander');
var lib = require('../lib/');

options
  .option('-b, --baseuri <uri>', 'base for Apigee API (default: https://api.enterprise.apigee.com)')
  .option('-o, --organization <org>', 'organization name')
  .option('-u, --username <username>', 'username or email')
  .option('-p, --password <password>', 'password')
  .option('-e, --environment <env>', 'environment (eg. test,production)')
  .option('-v, --virtualhosts <virtualhosts>', 'virtual hosts')
  .option('-d, --debug', 'turn on debug/verbose')
  .parse(process.argv);

lib.deployRemoteProxy(options, function(err, reply) {
  if (err) { return console.log(err); }
  console.log(reply);
});
