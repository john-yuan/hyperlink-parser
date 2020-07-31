const builder = require('@john-yuan/dev-browserify-builder');

builder.build('build/index.js', 'dist/HyperlinkParser.js', {
  standalone: 'HyperlinkParser',
  debug: false,
  detectGlobals: false
}, {
  compress: {
    drop_console: true
  }
});
