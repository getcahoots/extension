$(document).ready(function() {
	$.getJSON(chrome.extension.getURL('db.json'), function(data) {
        var cahootsRunner = new CahootsRunner(data);
        cahootsRunner.run();
    });
});