var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("jquery-1.11.1.min.js"),
                      data.url("jquery_highlight.js"),
                      data.url("jquery.tooltipster.min.js"),
                      data.url("authors.js"),
                      data.url("content_script.js")]
});