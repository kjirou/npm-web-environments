(function(){

  var WebEnv = function(){};

  WebEnv.VERSION = '0.0.1';

  // Exports
  if (typeof module !== 'undefined') {
    module.exports = WebEnv;
  } else {
    window.WebEnv = WebEnv;
  }

}());
