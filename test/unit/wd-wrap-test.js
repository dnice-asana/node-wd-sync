// Generated by CoffeeScript 1.3.3
(function() {
  var browse, passingBrowser, withoutPassingBrowser, _ref;

  _ref = require('../common/wd-wrap-test-base'), browse = _ref.browse, passingBrowser = _ref.passingBrowser, withoutPassingBrowser = _ref.withoutPassingBrowser;

  describe("passing browser", function() {
    return passingBrowser('remote');
  });

  describe("without passing browser", function() {
    return withoutPassingBrowser('remote');
  });

}).call(this);
