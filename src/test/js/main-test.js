//MODULES_ROOT = './'
//
//
//
//console.log("-> http://localhost:9876/base/src/test/resources/html/snippets.html")

var origRequire = require;
console.log("loading main-test.js")
console.log(require)
require = function(dep) {
    if(dep == "sdk/self") {
        console.log("yihaw")
    } else {
        console.log("delegating to original require")
        origRequire(dep)
    }
}



