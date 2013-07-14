define([
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
