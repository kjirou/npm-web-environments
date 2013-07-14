if (typeof module !== "undefined") {
  require("../node_test_config");
  var requirejs = require("requirejs");
  var mocha = require("mocha");
  var expect = require("expect.js");
  var sinon = require("sinon");
}

console.log('Start tests');


requirejs([
  "web-env"
], function(
  WebEnv
){

  describe('WebEnv Class ::', function(){
    it('Class definition', function(){
      expect(WebEnv).to.be.a('function');
    });

    it('VERSION', function(){
      expect(WebEnv.VERSION).to.match(/^\d+\.\d+.\d+(?:\.\d+)?$/);
    });
  });

});


console.log('End tests');
