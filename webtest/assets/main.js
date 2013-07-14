// If you want to change some config when process is running by Testem.
//if (typeof Testem !== 'undefined') {
//  console.log('Run by Testem!');
//}


requirejs.config({

  shim: {
    "web-environments": {
      exports: "webenv"
    }
  },

  paths: {
    "web-environments": "web-environments"
  },

  urlArgs: "_uncached=" +  (new Date()).getTime()
});


requirejs([
], function(){

  mocha.setup("bdd");
  mocha.checkLeaks();

  requirejs([
    "tests"
  ], function(){
    mocha.run();
  });
});
