// Generated by CoffeeScript 1.3.3
(function() {
  var Express, test, _ref;

  _ref = require('../common/per-method-test-base'), test = _ref.test, Express = _ref.Express;

  describe("wd-sync", function() {
    return describe("method by method tests", function() {
      var express;
      express = new Express;
      before(function(done) {
        express.start(done);
        return done(null);
      });
      after(function(done) {
        express.stop(done);
        return done(null);
      });
      describe("using chrome", function() {
        return test('remote', 'chrome');
      });
      return describe("using firefox", function() {
        return test('remote', 'firefox');
      });
    });
  });

}).call(this);
