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

  describe("Pure functions ::", function(){
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

    it("_parseDataPath", function(){
      var parts = webenv._parseDataPath("this.is.a.pen");
      expect(parts).to.eql(["this", "is", "a", "pen"]);

      expect(webenv._parseDataPath("")).to.eql([]);
      expect(webenv._parseDataPath(null)).to.eql([]);
      expect(webenv._parseDataPath(undefined)).to.eql([]);

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

    it("_findDataByPath", function(){
      var data = {
        x: 1,
        arr: ["one", "two", "three"],
        obj: {
          a: 3,
          nested: {
            foo: 100
          }
        },
        nl: null,
        undef: undefined
      };

      expect(webenv._findDataByPath(data, "x").scope).to.be(1);
      expect(webenv._findDataByPath(data, "arr").scope).to.eql(["one", "two", "three"]);
      expect(webenv._findDataByPath(data, "arr.2").scope).to.be("three");
      expect(webenv._findDataByPath(data, "obj.a").scope).to.be(3);
      expect(webenv._findDataByPath(data, "obj.nested.foo").scope).to.be(100);
      expect(webenv._findDataByPath(data, "nl").scope).to.be(null);
      expect(webenv._findDataByPath(data, "undef").scope).to.be(undefined);

      expect(webenv._findDataByPath(data, "x").scopeKey).to.be("x");
      expect(webenv._findDataByPath(data, "obj.nested.foo").scopeKey).to.be("foo");

      expect(webenv._findDataByPath(data, "x").parentScope).to.be(data);
      expect(webenv._findDataByPath(data, "obj.nested.foo").parentScope).to.be(data.obj.nested);
      expect(webenv._findDataByPath(data, "").parentScope).to.be(null);

      expect(function(){
        webenv._findDataByPath(data, "y");
      }).throwException(/Not found/);
      expect(function(){
        webenv._findDataByPath(data, "obj.nested.zzz");
      }).throwException(/Not found/);
    });

    it("_findDataByPath with defaultValue", function(){
      expect(webenv._findDataByPath({}, "x", 1).scope).to.be(1);
      expect(webenv._findDataByPath({x:1}, "x", 2).scope).to.be(1);
      expect(webenv._findDataByPath({x:{}}, "x.y", 1).scope).to.be(1);
      expect(webenv._findDataByPath({}, "not.found.path", 1).scope).to.be(1);
    });
  });

  describe("Inputs and outputs ::", function(){
    it("set", function(){
    });
  });

});
