;(function(){

if (typeof module !== 'undefined') {
  var expect = require('expect.js');
  var sinon = require('sinon');
  var WebEnv = require('../web-env.js');
} else {
  var expect = this.expect;
  var sinon = this.sinon;
  var WebEnv = this.WebEnv;
}


describe('WebEnv Class ::', function(){
  it('Class definition', function(){
    expect(WebEnv).to.be.a('function');
  });

  it('VERSION', function(){
    expect(WebEnv.VERSION).to.match(/^\d+\.\d+.\d+(?:\.\d+)?$/);
  });
});


}());
