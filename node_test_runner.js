// Path settings to sync requirejs.config
var paths = {
  "web-env": "./web-env"
};


// Wrap define
var _define = require("amdefine")(module);
var define = function(deps, callback){
  var i, moduleName;
  for (i = 0; i < deps.length; i++) {
    moduleName = deps[i];
    if (moduleName in paths) {
      deps[i] = paths[moduleName];
    }
  }
  return _define(deps, callback);
};


// Globals
global.define = define
global.expect = require("expect.js");
global.sinon = require("sinon");


// Run tests
require('./test/tests.js');


module.exports = function(){};
