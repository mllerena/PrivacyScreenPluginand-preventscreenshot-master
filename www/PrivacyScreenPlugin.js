//var exec = require('cordova/exec');

/** 
 * Not sure this will even have a JS API
 */
//exports.activate = function(arg, success, error) {
  //exec(success, error, "PrivacyScreenPlugin", "activate", [arg]);
//};

var exec = require('cordova/exec');
var cordova = require('cordova');

var screenshot = {
  enable: function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'PrivacyScreenPlugin', 'enable', []);
  },
  disable: function (successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'PrivacyScreenPlugin', 'disable', []);
  },
  registerListener : function(callback) {
    exec(callback, callback, 'PrivacyScreenPlugin', 'listen', []);

  }
}

cordova.addConstructor(function () {
  if (!window.plugins) {window.plugins = {};}

  window.plugins.preventscreenshot = screenshot;
  document.addEventListener("onTookScreenshot",function(){
    console.log('tookScreenshot');
  });
  document.addEventListener("onGoingBackground",function(){
    console.log('BackgroundCalled');
  });
  screenshot.registerListener(function(me) {
    console.log('received listener:',me);
    if(me === "background") {
      var event = new Event('onGoingBackground');
      document.dispatchEvent(event);
      return;
    }
    if(me === "tookScreenshot") {
      var event = new Event('onTookScreenshot');
      document.dispatchEvent(event);
      return;
    }
  });
  return window.plugins.preventscreenshot;
});
