requirejs.config({

  //baseUrl: "./",

  shim: {
    "web-env": {
      exports: "WebEnv"
    },
    mocha: {
      init: function(){
        this.mocha.setup("bdd");
        this.mocha.checkLeaks();
        this.mocha.globals([
          "navigator",
          "Testem"
        ]);
        return this.mocha;
      }
    },
    expect: {
      exports: "expect"
    },
    sinon: {
      exports: "sinon"
    }
  },

  paths: {
    "web-env": "web-env",
    mocha: "node_modules/mocha/mocha",
    expect: "node_modules/expect.js/expect",
    sinon: "node_modules/sinon/pkg/sinon"
  },

  urlArgs: '_uncached=' +  (new Date()).getTime()
});


requirejs([
  "mocha",
  "tests"
], function(mocha){
  mocha.run();
});
