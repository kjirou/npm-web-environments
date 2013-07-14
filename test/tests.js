define([
  "web-environments"
], function(
  webenv
){

  describe("WebEnv Class ::", function(){
    it("Class definition", function(){
      expect(webenv).to.be.a("function");
    });

    it("VERSION", function(){
      expect(webenv.VERSION).to.match(/^\d+\.\d+.\d+(?:\.\d+)?$/);
    });
  });

});
