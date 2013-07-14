// If you want to change some config
//   when process is running by Testem.
//if (typeof Testem !== 'undefined') {
//  console.log('Run by Testem!');
//}


requirejs.config({

  //baseUrl: "./",

  shim: {
    "web-env": {
      exports: "WebEnv"
    }
  },

  paths: {
    "web-env": "web-env"
  },

  urlArgs: '_uncached=' +  (new Date()).getTime()
});


requirejs([
], function(){

  mocha.setup("bdd");
  mocha.checkLeaks();
  //mocha.globals();

  requirejs([
    "tests"
  ], function(){
    mocha.run();
  });
});
