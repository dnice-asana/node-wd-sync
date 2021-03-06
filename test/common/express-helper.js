// Generated by CoffeeScript 1.6.3
(function() {
  var Express, express;

  express = require('express');

  Express = function(rootDir) {
    this.rootDir = rootDir;
    this.partials = {};
    return this;
  };

  Express.prototype.start = function() {
    var partials;
    this.app = express();
    this.app.set('view engine', 'hbs');
    this.app.set('views', this.rootDir + '/views');
    partials = this.partials;
    this.app.get('/test-page', function(req, res) {
      var content;
      content = '';
      if (req.query.partial) {
        content = partials[req.query.partial];
      }
      return res.render('test-page', {
        testTitle: req.query.partial,
        content: content
      });
    });
    this.app.use(express["static"](this.rootDir + '/public'));
    return this.server = this.app.listen(env.EXPRESS_PORT);
  };

  Express.prototype.stop = function() {
    return this.server.close();
  };

  module.exports = {
    Express: Express
  };

}).call(this);
