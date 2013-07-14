define([
  "web-environments"
], function(
  webenv
){

  describe("Static properties ::", function(){
    it("Module definition", function(){
      expect(webenv).to.be.a("function");
    });

    it("VERSION", function(){
      expect(webenv.VERSION).to.match(/^\d+\.\d+.\d+(?:\.\d+)?$/);
    });
  });

  describe("General methods ::", function(){
    it("_extend", function(){
      var foo = {x:1, y:2, z:3};
      var bar = {x:11, a:22};
      var baz = webenv._extend(foo, bar);
      expect(foo).to.eql({x:11, y:2, z:3, a:22});
      expect(bar).to.eql({x:11, a:22});
      expect(baz).to.be(foo);
    });

    it("_is", function(){
      expect(webenv._is("Object", {})).to.ok();
      expect(webenv._is("Array", [])).to.ok();
      expect(webenv._is("String", "s")).to.ok();
      expect(webenv._is("Number", 1)).to.ok();
      expect(webenv._is("Boolean", true)).to.ok();
      expect(webenv._is("Null", null)).not.to.ok();
      expect(webenv._is("Undefined", undefined)).not.to.ok();
    });
  });

  describe("Stand alone methods ::", function(){
    it("_parseDataPath", function(){
      var parts = webenv._parseDataPath("this.is.a.pen");
      expect(parts).to.eql(["this", "is", "a", "pen"]);

      expect(webenv._parseDataPath("")).to.eql([]);
      expect(webenv._parseDataPath(null)).to.eql([]);

      expect(function(){
        webenv._parseDataPath(".foo.bar");
      }).throwException(/Invalid formatted/);
      expect(function(){
        webenv._parseDataPath("foo..bar");
      }).throwException(/Invalid formatted/);
      expect(function(){
        webenv._parseDataPath("foo.bar.");
      }).throwException(/Invalid formatted/);
    });
  });

});
