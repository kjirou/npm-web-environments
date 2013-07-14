;(function(){

  var webenv = function(){};

  webenv.VERSION = '0.0.1';

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
