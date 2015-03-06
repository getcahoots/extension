chrome = {
    pageAction: {
        show: function(){},
        onClicked: {
            addListener: function(){}
        }
    },
    runtime: {
        onMessage: {
            addListener: function(){}
        },
        sendMessage: function(obj, callback) {
            if(obj.message=="getAuthorHints") {
                callback({'Christoph Hein':'loeeeel'});
            }
        }
    }
}
