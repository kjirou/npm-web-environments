var requirejs = require('requirejs');

requirejs.config({

  baseUrl: __dirname,

  nodeRequire: require,

  shim: {
    "web-env": {
      exports: "WebEnv"
    }
  },

  paths: {
    "web-env": "web-env"
  }

});

module.exports = function(){};
