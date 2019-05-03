var watcher = require('@john-yuan/dev-browserify-watcher');

var watch = function () {
    watcher.watch({
        entry: 'lib/HyperlinkParser.js',
        output: 'dist/HyperlinkParser.js',
        paths: 'lib/**/*.js',
        browserifyOptions: {
            standalone: 'HyperlinkParser',
            debug: true,
            detectGlobals: false,
        }
    });
};

exports.watch = watch;
