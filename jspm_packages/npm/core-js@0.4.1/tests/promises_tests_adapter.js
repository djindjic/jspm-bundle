/* */ 
var Promise = require("../index").Promise;
module.exports.deferred = function __deferred__() {
  var o = {};
  o.promise = new Promise(function __Promise__(resolve, reject) {
    o.resolve = resolve;
    o.reject = reject;
  });
  return o;
};
module.exports.resolved = function __resolved__(val) {
  return Promise.resolve(val);
};
module.exports.rejected = function __rejected__(reason) {
  return Promise.reject(reason);
};