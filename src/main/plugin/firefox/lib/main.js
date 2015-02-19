var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var Request = require("sdk/request").Request;

pageMod.PageMod({
	include: "*",
	contentScriptFile: [
		data.url("jquery-1.11.1.min.js"),
        data.url("jquery_highlight.js"),
        data.url("jquery.tooltipster.min.js"),
        data.url("authors.js"),
        data.url("content_script.js")
	],
    contentStyleFile: [
		data.url("style.css"),
  		data.url("tooltipster.css")
	],
  	onAttach: function(worker) {
  		worker.port.on("gotID", function(id) {

  			Request ({
  				url: data.url('db.json'),
  				onComplete: function(response) {
  					var db = response.json;
  					worker.port.emit('gotContent', db[id]);
  				}
  			}).get();
  		});
  	}
}); 