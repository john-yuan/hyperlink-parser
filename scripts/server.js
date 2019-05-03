var server = require('@john-yuan/dev-server');

var start = function (callback) {
    return server.start({
        port: 4003,
        index: 'web/index.html'
    }, callback);
};

exports.start = start;
