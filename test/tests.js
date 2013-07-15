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

  describe("Inner functions ::", function(){
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

    it("_goUpDataPath", function(){
      expect(webenv._goUpDataPath("a.b.c")).to.be("a.b");
      expect(webenv._goUpDataPath("")).to.be(null);
      expect(webenv._goUpDataPath(null)).to.be(null);
    });

    it("_getLastPartOfDataPath", function(){
      expect(webenv._getLastPartOfDataPath("a.b.c")).to.be("c");
      expect(webenv._getLastPartOfDataPath("a")).to.be("a");
    });
  });

  describe("APIs ::", function(){
    afterEach(function(){
      webenv.clean();
    });

    it("set", function(){
      webenv.set("x", 1);
      expect(webenv._data).to.eql({x:1});

      webenv.set("obj", {a:11, obj:{}});
      expect(webenv._data).to.eql({x:1, obj:{a:11, obj:{}}});

      webenv.set("obj.obj.arr", [1,2,3]);
      expect(webenv._data).to.eql({x:1, obj:{a:11, obj:{arr:[1,2,3]}}});

      expect(function(){
        webenv.set("notexisted.key", 1);
      }).throwException(/Not found data/);
      expect(function(){
        webenv.set("x.isnotobj", 1);
      }).throwException(/Can't set/);

      webenv.set({x:11,y:22});
      expect(webenv._data).to.eql({x:11, y:22});
    });

    it("extend", function(){
      webenv.extend({x:1, y:2});
      expect(webenv._data).to.eql({x:1, y:2});

      webenv.extend({x:11, z:3});
      expect(webenv._data).to.eql({x:11, y:2, z:3});

      webenv.extend({obj:{a:1}});
      expect(webenv._data).to.eql({x:11, y:2, z:3, obj:{a:1}});

      webenv.extend("obj", {a:11, b:2});
      expect(webenv._data).to.eql({x:11, y:2, z:3, obj:{a:11, b:2}});

      expect(function(){
        webenv.extend("x", {x_is_not_obj:1});
      }).throwException(/Can't extend data/);
    });

    it("get", function(){
      webenv.set({
        x: 1,
        foo: {
          xx: 11,
          bar: {
            xxx: 111
          }
        },
        arr: [1, 2, 3, { inarr: 1 }],
        str: "hello",
        bool: true,
        nl: null,
        undef: undefined
      });

      expect(webenv.get("x")).to.be(1);
      expect(webenv.get("str")).to.be("hello");
      expect(webenv.get("bool")).to.be(true);
      expect(webenv.get("nl")).to.be(null);
      expect(webenv.get("undef")).to.be(undefined);
      expect(webenv.get("foo")).to.eql({xx:11, bar:{xxx:111}});
      expect(webenv.get("foo.bar.xxx")).to.be(111);
      expect(webenv.get("arr.3.inarr")).to.be(1);

      expect(function(){
        webenv.get("y");
      }).throwException(/Not found data/);
      expect(function(){
        webenv.get("foo.yy");
      }).throwException(/Not found data/);


      // With defaultValue
      expect(webenv.get("notexisted", 100)).to.be(100);
      expect(webenv.get("foo.notexisted", 100)).to.be(100);
      expect(webenv.get("foo.notexisted", undefined)).to.be(undefined);

      // This is wrong behavior.
      // Truly, I want to raise a error in this case.
      webenv.get("notexisted_parent.and_child", 1);
    });
  });

});
