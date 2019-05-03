var fs = require('fs');
var path = require('path');
var assert = require('assert');
var HyperlinkParser = require('../lib/HyperlinkParser');

describe('version', function () {
    it('version is ' + HyperlinkParser.version, function () {
        var addr = path.resolve(__dirname, '../package.json');
        var json = fs.readFileSync(addr).toString();
        var data = JSON.parse(json);

        assert.deepStrictEqual(HyperlinkParser.version, data.version);
    });
});
