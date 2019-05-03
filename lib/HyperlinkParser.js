var Hyperlink = require('./Hyperlink');
var version = '0.0.1-alpha.1';

/**
 * Parse the given URL.
 *
 * @param {string} url The url to parse.
 * @returns {Hyperlink} Returns an instance of `Hyperlink`.
 */
function parse(url) {
    return new Hyperlink(url);
}

exports.version = version;
exports.Hyperlink = Hyperlink;
exports.parse = parse;
