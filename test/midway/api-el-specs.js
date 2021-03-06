// Generated by CoffeeScript 1.6.3
(function() {
  var CoffeeScript, Express, testInfo;

  testInfo = {
    name: 'api el',
    tags: ['midway']
  };

  require("../common/setup");

  Express = require("../common/express-helper").Express;

  CoffeeScript = require('coffee-script');

  describe("api el specs " + env.TEST_ENV_DESC, function() {
    var allPassed, browser, express, funcSuffix, sync, wrap, _fn, _i, _len, _ref, _ref1;
    this.timeout(env.TIMEOUT);
    _ref = {}, browser = _ref.browser, sync = _ref.sync;
    wrap = wdSync.wrap({
      "with": (function() {
        return browser;
      })
    });
    allPassed = true;
    express = new Express(__dirname + '/assets');
    before(function() {
      var _ref1;
      express.start();
      _ref1 = wdSync.remote(env.REMOTE_CONFIG), browser = _ref1.browser, sync = _ref1.sync;
      if (env.VERBOSE) {
        browser.on("status", function(info) {
          return console.log("\u001b[36m%s\u001b[0m", info);
        });
        return browser.on("command", function(meth, path) {
          return console.log(" > \u001b[33m%s\u001b[0m: %s", meth, path);
        });
      }
    });
    before(wrap(function() {
      return this.init(desiredWithTestInfo(testInfo));
    }));
    beforeEach(function(done) {
      var cleanTitle;
      cleanTitle = this.currentTest.title.replace(/@[-\w]+/g, '').trim();
      return sync(function() {
        this.get(env.MIDWAY_ROOT_URL + '/test-page?partial=' + encodeURIComponent(cleanTitle));
        return done();
      });
    });
    afterEach(function() {
      return allPassed = allPassed && (this.currentTest.state === 'passed');
    });
    after(wrap(function() {
      express.stop();
      this.quit();
      if (env.SAUCE) {
        return this.sauceJobStatus(allPassed);
      }
    }));
    express.partials['browser.element'] = '<div id="theDiv"><div name="meme">Hello World!</div></div>';
    it("browser.element", wrap(function() {
      should.exist(this.element("name", "meme"));
      return (function() {
        return this.element("name", "meme2");
      }).should["throw"]();
    }));
    express.partials['browser.elementOrNull'] = '<div id="theDiv"><div name="meme">Hello World!</div></div>';
    it("browser.elementOrNull", wrap(function() {
      should.exist(this.elementOrNull("name", "meme"));
      return should.not.exist(this.elementOrNull("name", "meme2"));
    }));
    express.partials['browser.hasElement'] = '<div id="theDiv"><div name="meme">Hello World!</div></div>';
    it("browser.hasElement", wrap(function() {
      (this.hasElement("name", "meme")).should.be["true"];
      return (this.hasElement("name", "meme2")).should.be["false"];
    }));
    express.partials['browser.elements'] = '<div id="theDiv">\n  <div name="meme">Hello World!</div>\n  <div name="meme">Hello World!</div>\n  <div name="meme">Hello World!</div>\n</div>';
    it("browser.elements", wrap(function() {
      (this.elements("name", "meme")).should.have.length(3);
      return (this.elements("name", "meme2")).should.eql([]);
    }));
    _ref1 = ['ById', 'ByCss'];
    _fn = function() {
      var elFuncPartial, elementFuncName, elementsFuncName, hasElementFuncName, searchSeveralText, searchSeveralText2, searchText, searchText2;
      elFuncPartial = '<div id="theDiv">\n  <div id="elementById">Hello World!</div>\n  <div class="elementByCss">Hello World!</div>\n\n  <div>\n    <div id="elementsById">Hello World!</div>\n  </div>\n  <div>\n    <div name="elementsByName">Hello World!</div>\n    <div name="elementsByName">Hello World!</div>\n    <div name="elementsByName">Hello World!</div>\n  </div>\n  <div name="elementByName">Hello World!</div>\n  <div>\n    <div class="elementsByCss">Hello World!</div>\n    <div class="elementsByCss">Hello World!</div>\n    <div class="elementsByCss">Hello World!</div>\n  </div>\n</div>';
      elementFuncName = 'element' + funcSuffix;
      hasElementFuncName = 'hasElement' + funcSuffix;
      elementsFuncName = 'elements' + funcSuffix;
      searchText = elementFuncName;
      if (searchText.match(/ByLinkText/)) {
        searchText = "click " + searchText;
      }
      if (searchText.match(/ByCss/)) {
        searchText = "." + searchText;
      }
      if (searchText.match(/ByXPath/)) {
        searchText = "//div[@id='elementByXPath']/input";
      }
      if (searchText.match(/ByTagName/)) {
        searchText = "span";
      }
      searchText2 = searchText + '2';
      if (searchText.match(/ByXPath/)) {
        searchText2 = "//div[@id='elementByXPath2']/input";
      }
      if (searchText.match(/ByTagName/)) {
        searchText2 = "span2";
      }
      searchSeveralText = searchText.replace('element', 'elements');
      searchSeveralText2 = searchText2.replace('element', 'elements');
      express.partials["browser." + elementFuncName] = elFuncPartial;
      it("browser." + elementFuncName, wrap(function() {
        should.exist(this[elementFuncName](searchText));
        return (function() {
          return this[elementFuncName](searchText2);
        }).should["throw"]();
      }));
      express.partials["browser." + elementFuncName + 'IfExists'] = elFuncPartial;
      it("browser." + elementFuncName + 'IfExists', wrap(function() {
        should.exist(this[elementFuncName + 'IfExists'](searchText));
        return should.not.exist(this[elementFuncName + 'IfExists'](searchText2));
      }));
      express.partials["browser." + hasElementFuncName] = elFuncPartial;
      it("browser." + hasElementFuncName, wrap(function() {
        (this[hasElementFuncName](searchText)).should.be["true"];
        return (this[hasElementFuncName](searchText2)).should.be["false"];
      }));
      express.partials["browser." + elementsFuncName] = elFuncPartial;
      return it("browser." + elementsFuncName, wrap(function() {
        var res;
        res = this[elementsFuncName](searchSeveralText);
        if (elementsFuncName.match(/ById/)) {
          res.should.have.length(1);
        } else if (elementsFuncName.match(/ByTagName/)) {
          (res.length > 1).should.be["true"];
        } else {
          res.should.have.length(3);
        }
        res = this[elementsFuncName](searchSeveralText2);
        return res.should.eql([]);
      }));
    };
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      funcSuffix = _ref1[_i];
      _fn();
    }
    express.partials['browser.getAttribute'] = ' <div id="theDiv" weather="sunny">Hi</div>';
    it("browser.getAttribute", wrap(function() {
      var testDiv;
      testDiv = this.elementById("theDiv");
      (this.getAttribute(testDiv, "weather")).should.equal("sunny");
      testDiv.getAttribute("weather").should.equal("sunny");
      return should.not.exist(this.getAttribute(testDiv, "timezone"));
    }));
    express.partials['browser.getValue'] = '<div id="theDiv">\n  <input class="input-text" type="text" value="Hello getValueTest!">\n  <textarea>Hello getValueTest2!</textarea>\n</div>';
    it("browser.getValue", wrap(function() {
      var inputField, textareaField;
      inputField = this.elementByCss("#theDiv input");
      (this.getValue(inputField)).should.equal("Hello getValueTest!");
      inputField.getValue().should.equal("Hello getValueTest!");
      textareaField = this.elementByCss("#theDiv textarea");
      return (this.getValue(textareaField)).should.equal("Hello getValueTest2!");
    }));
    express.partials['element(s) within element(s)'] = '<div id="theDiv">\n  <div class="subDiv">\n    <textarea>Hello!</textarea>\n  </div>\n  <div class="subDiv2">\n    <textarea>Hello2!</textarea>\n  </div>\n</div>';
    return it("element(s) within element(s)", wrap(function() {
      var subDiv, textareas, theDiv;
      theDiv = this.elementById("theDiv");
      theDiv.text().should.include("Hello");
      subDiv = theDiv.elementByCss(".subDiv");
      subDiv.text().should.include("Hello");
      textareas = subDiv.elementsByTagName('textarea');
      textareas.should.have.length(1);
      textareas[0].getValue().should.equal('Hello!');
      theDiv = (this.elementsByCss("#theDiv"))[0];
      theDiv.should.exist;
      theDiv.getComputedCss('color').should.include('rgb');
      textareas = theDiv.elementsByTagName('textarea');
      textareas.should.have.length(2);
      return textareas[1].getValue().should.equal('Hello2!');
    }));
  });

}).call(this);
