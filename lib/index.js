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

var apigeetool = require('apigeetool');
var inquirer = require('inquirer');
var path = require('path');

var PROXY_OPTIONS = {
  api: 'apigee-remote-proxy',
  directory: __dirname,
  'base-path': '/',
  'import-only': false
};

var REQUIRED_OPTIONS = [
  { name: 'baseuri',      message: 'Base URI?', default: 'https://api.enterprise.apigee.com' },
  { name: 'organization', message: 'Organization?' },
  { name: 'username',     message: 'User Id?'  },
  { name: 'password',     message: 'Password?', type: 'password' },
  { name: 'environment',  message: 'Environment?'  }
];

module.exports = {
  deployRemoteProxy: deployRemoteProxy
};

function deployRemoteProxy(options, cb) {

  requireAnswers(REQUIRED_OPTIONS, options, function(options) {

    for (var k in PROXY_OPTIONS) {
      options[k] = PROXY_OPTIONS[k];
    }

    apigeetool.deployProxy(options, function(err, reply) {
      cb(err, reply);
    });
  });
}


// questions are array of objects like these:
// { name: 'key', message: 'Your prompt?' }
// { name: 'key', message: 'Your prompt?', type: 'password' }
// { name: 'key', message: 'Your prompt?', type: 'list', choices: ['1', '2'] }
// results is an (optional) object containing existing results like this: { key: value }
function requireAnswers(questions, results, cb) {
  if (!cb) { cb = results; results = {}; }
  var unanswered = getUnanswered(questions, results);
  if (unanswered.length === 0) {
    return cb(results);
  }
  inquirer.prompt(unanswered, function(answers) {
    for (var k in answers) {
      results[k] = answers[k];
    }
    requireAnswers(questions, results, cb);
  });
}

function getUnanswered(questions, results) {
  var unanswered = [];
  for (var i = 0; i < questions.length; i++) {
    var question = questions[i];
    if (!results[question.name]) {
      unanswered.push(question);
    }
  }
  return unanswered;
}
