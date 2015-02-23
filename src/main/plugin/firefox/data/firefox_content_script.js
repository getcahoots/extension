$(document).ready(function() {
    self.port.on('gotData', function(data){
        var cahootsRunner = new CahootsRunner(data);
        cahootsRunner.run();
    });
    self.port.emit('getData');
});