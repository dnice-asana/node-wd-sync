{browse, passingBrowser, withoutPassingBrowser} = require '../common/wd-wrap-test-base'

describe "passing browser", ->  
  passingBrowser 'remote'

describe "without passing browser", ->    
  withoutPassingBrowser 'remote'
