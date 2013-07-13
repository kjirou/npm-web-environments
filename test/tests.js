define([
  "web-env",
  "mocha",
  "expect",
  "sinon"
], function(
  WebEnv,
  mocha,
  expect,
  sinon
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
