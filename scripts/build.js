var builder = require('@john-yuan/dev-browserify-builder');

builder.build('lib/HyperlinkParser.js', 'dist/HyperlinkParser.min.js', {
    standalone: 'HyperlinkParser',
    debug: false,
    detectGlobals: false
}, {
    compress: {
        drop_console: true
    }
});
