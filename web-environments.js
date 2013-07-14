;(function(){

  var webenv = function(){};


  webenv.VERSION = "0.0.1";

  webenv.DATA_PATH_SEPARATOR = "."


  webenv._data = {};


  webenv.clean = function(){
    webenv._data = {};
  };

  webenv._extend = function(obj, props){
    var k, v;
    for (k in props) {
      if (props.hasOwnProperty(k)) {
        v = props[k];
        obj[k] = v;
      }
    }
    return obj;
  };

  // Ref) http://bonsaiden.github.io/JavaScript-Garden/ja/#types.typeof
  webenv._is = function (type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  };

  webenv.set = function(dataPath, data){
    if (arguments.length === 1) {
      data = dataPath;
      dataPath = null;
    }

    var results = this._findDataByPath(this._data, dataPath);

    if (results.parentScope === null) {
      this._data = data;
    } else {
      results.parentScope[results.scopeKey] = data;
    }
  };

  webenv.extend = function(dataPath, data){
    if (arguments.length === 1) {
      data = dataPath;
      dataPath = null;
    }

    var results = this._findDataByPath(this._data, dataPath);

    if (this._is("Object", results.scope)) {
      return this._extend(results.scope, data);
    } else {
      throw new Error("Can't extand data, dataPath=\"" + dataPath + "\".");
    }
  };

  webenv.get = function(dataPath, defaultValue){
    var results;
    // It is for changing arguments.length.
    if (arguments.length === 1) {
      results = this._findDataByPath(this._data, dataPath);
    } else {
      results = this._findDataByPath(this._data, dataPath, defaultValue);
    }
    return results.scope;
  };

  webenv._findDataByPath = function(data, dataPath, defaultValue){
    var hasDefaultValue = arguments.length >= 3;
    var partPaths = this._parseDataPath(dataPath);

    var parentScope = null;
    var currentScope = data;
    var currentScopeKey = null;

    var i, partPath;
    for (i = 0; i < partPaths.length; i += 1) {
      partPath = partPaths[i];
      if (
        currentScope instanceof Object &&
        currentScope.hasOwnProperty(partPath)
      ) {
        parentScope = currentScope;
        currentScope = currentScope[partPath];
        currentScopeKey = partPath;
      } else {
        if (hasDefaultValue) {
          parentScope = currentScope;
          currentScope = defaultValue;
          currentScopeKey = null;
          break;
        }
        throw new Error("Not found data, dataPath=\"" + dataPath + "\".");
      }
    }

    return {
      scope: currentScope,
      parentScope: parentScope,
      scopeKey: currentScopeKey
    };
  };

  webenv._parseDataPath = function(dataPath){
    if (dataPath === "" || dataPath === null) {
      return [];
    }
    var partPaths = dataPath.split(this.DATA_PATH_SEPARATOR);
    var i;
    for (i = 0; i < partPaths.length; i += 1) {
      // e.g. ".key1.key2", "key1.key2.", "key.." are invalid.
      if (partPaths[i] === "") {
        throw new Error("Invalid formatted data-path=\"" + dataPath + "\".");
      }
    }
    return parts;
  };


  // Exports
  if (typeof module !== "undefined" && module.exports) {
    module.exports = webenv;
  }
  if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
    define("webenv", function(){
      return webenv;
    });
  }
  if (typeof window !== "undefined") {
    window.webenv = webenv;
  }

}).call(this);
