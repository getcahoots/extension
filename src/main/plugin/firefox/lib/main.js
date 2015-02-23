var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;
pageMod.PageMod({
	include: "*",
	contentScriptFile: [
		data.url("jquery.js"),
        data.url("jquery_highlight.js"),
        data.url("jquery.tooltipster.js"),
        data.url("CahootsRepository.js"),
        data.url("CahootsRunner.js"),
        data.url("firefox_content_script.js")
	],
    contentStyleFile: [
		data.url("style.css"),
  		data.url("cahoots-tooltipster.css")
	],
  	onAttach: function(worker) {
        worker.port.on("getData",function() {
            Request ({
  				url: data.url('db.json'),
  				onComplete: function(response) {
  					var db = response.json;
  					worker.port.emit('gotData', db);
  				}
  			}).get();
        })
  	}
}); 