# wd-sync

A synchronous version with a nice api of [wd](http://github.com/admc/wd), 
the lightweight  [WebDriver / Selenium2](http://seleniumhq.org/projects/webdriver/) 
client for node.js, built using  [node-fibers](http://github.com/laverdet/node-fibers).

Remote testing with [Sauce Labs](http://saucelabs.com) also works.

## install

```
npm install wd-sync
```


## usage

When creating a new browser with remote, an extra mode option need to be 
passed.

All the methods from [wd](http://github.com/admc/wd) are available. The element retrieval 
methods have been modified to return 'undefined' when the element is not found rather than
throw a 'Not Found' error.

In sync mode, the browser function must to be run within a Wd block. This 
block holds the fiber environment. 

```javascript
{1wdsimplejs}
```


## Sauce Labs example

Remote testing with [Sauce Labs](http://saucelabs.com) works. The extra mode
option is also needed here.

```javascript
{2wdsaucelabsjs}
```


## WdWrap

WdWrap is a wrapper around Wd. It returns a function with a callback arguments, 
called last, after other commands have been executed. 

The example below is using the mocha test framework. The usual 'done' callback 
is managed within WdWrap.

A 'pre' method may also be specified. It is called before the Wd block starts, in the original 
context (In Mocha, it can be used to configure timeouts). 

```coffeescript
{3wdwrapmochasimplejs}
```

## a slightly leaner syntax (or the lack of it)

Since JavaScript has no short equivalent for the '@' alias, most this section is not relevant in JavaScript.  

Using the pre option like in the mocha sample below may still be beneficial, althought not as good as the coffee
script syntax.
```coffeescript
{4wdwrapmochaleanerjs}
```


## to retrieve the browser currently in use

The current browser is automatically stored in the Fiber context.
It can be retrieved with the wd.current() function. 

This is useful when writing test helpers.

Don't forget to set the use option in the block, or globably like in the sample below. 

```coffeescript
{5wdcurrentbrowserjs}
```

## modes

Check [make-sync](http://github.com/sebv/node-make-sync/blob/master/README.markdown#modes) for more details. 
Probably best to use the 'sync' mode. 

A few methods have the mixed-args mode forced on them.

```coffeescript
mode: 'sync'
mode: 'async'

mode: ['mixed']
mode: ['mixed','args']

mode: ['mixed','fibers']

# methods forced to ['mixed','args']
['executeAsync', 'element', 'getAttribute', 'text']
```


## Selenium server

Download the Selenium server [here](http://seleniumhq.org/download/).

Download the Chromedriver [here](http://code.google.com/p/chromedriver/downloads/list).

To start the server:

```
java -jar selenium-server-standalone-2.21.0.jar -Dwebdriver.chrome.driver=./chromedriver
```


## per methods tests / code example

check in [wd-by-method-test.coffee](https://github.com/sebv/node-wd-sync/blob/master/test/unit/wd-by-method-test.coffee)