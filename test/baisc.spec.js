var assert = require('assert');
var HyperlinkParser = require('../lib/HyperlinkParser');

describe('basic', function () {
    it('http://example.com', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://example.com/',
            origin: 'http://example.com'
        });
    });

    it('http://example.com/', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com/');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://example.com/',
            origin: 'http://example.com'
        });
    });

    it('http://example.com/path/name', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com/path/name');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/path/name',
            search: '',
            hash: '',
            href: 'http://example.com/path/name',
            origin: 'http://example.com'
        });
    });

    it('http://example.com/path/name?search=yes', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com/path/name?search=yes');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '',
            href: 'http://example.com/path/name?search=yes',
            origin: 'http://example.com'
        });
    });

    it('http://example.com/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: 'http://example.com/path/name?search=yes#fragments',
            origin: 'http://example.com'
        });
    });

    it('http://example.com:8080/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com:8080/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: 'http://example.com:8080/path/name?search=yes#fragments',
            origin: 'http://example.com:8080'
        });
    });

    it('http://user@example.com:8080/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('http://user@example.com:8080/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: 'user',
            password: '',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: 'http://user@example.com:8080/path/name?search=yes#fragments',
            origin: 'http://example.com:8080'
        });
    });

    it('http://:pass@example.com:8080/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('http://:pass@example.com:8080/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: 'pass',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: 'http://:pass@example.com:8080/path/name?search=yes#fragments',
            origin: 'http://example.com:8080'
        });
    });

    it('http://user:pass@example.com:8080/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('http://user:pass@example.com:8080/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: 'user',
            password: 'pass',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: 'http://user:pass@example.com:8080/path/name?search=yes#fragments',
            origin: 'http://example.com:8080'
        });
    });

    it('//user:pass@example.com:8080/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('//user:pass@example.com:8080/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: '',
            username: 'user',
            password: 'pass',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: '//user:pass@example.com:8080/path/name?search=yes#fragments',
            origin: '//example.com:8080'
        });
    });

    it('/path/name?search=yes#fragments', function () {
        var hyperlink = HyperlinkParser.parse('/path/name?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: '',
            username: '',
            password: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '/path/name',
            search: '?search=yes',
            hash: '#fragments',
            href: '/path/name?search=yes#fragments',
            origin: ''
        });
    });
});
