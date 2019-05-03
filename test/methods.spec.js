var assert = require('assert');
var HyperlinkParser = require('../lib/HyperlinkParser');

describe('methods', function () {
    it('HyperlinkParser.parse', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        assert.deepStrictEqual(hyperlink instanceof HyperlinkParser.Hyperlink, true);
    });

    it('Hyperlink.prototype.setHref', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setHref('https://example.com:8080/path?search=yes#fragments');

        assert.deepEqual(hyperlink, {
            protocol: 'https:',
            username: '',
            password: '',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/path',
            search: '?search=yes',
            hash: '#fragments',
            href: 'https://example.com:8080/path?search=yes#fragments',
            origin: 'https://example.com:8080'
        });
    });

    it('Hyperlink.prototype.setProtocol', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setProtocol('https:');

        assert.deepEqual(hyperlink, {
            protocol: 'https:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'https://example.com/',
            origin: 'https://example.com'
        });
    });

    it('Hyperlink.prototype.setUserName', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setUserName('username');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: 'username',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://username@example.com/',
            origin: 'http://example.com'
        });
    });

    it('Hyperlink.prototype.setPassword', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setPassword('password');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: 'password',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://:password@example.com/',
            origin: 'http://example.com'
        });
    });

    it('Hyperlink.prototype.setHost', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setHost('api.example.org:8080');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'api.example.org:8080',
            hostname: 'api.example.org',
            port: '8080',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://api.example.org:8080/',
            origin: 'http://api.example.org:8080'
        });
    });

    it('Hyperlink.prototype.setHostName', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setHostName('api.example.org');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'api.example.org',
            hostname: 'api.example.org',
            port: '',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://api.example.org/',
            origin: 'http://api.example.org'
        });
    });

    it('Hyperlink.prototype.setPort', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setPort('8080');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com:8080',
            hostname: 'example.com',
            port: '8080',
            pathname: '/',
            search: '',
            hash: '',
            href: 'http://example.com:8080/',
            origin: 'http://example.com:8080'
        });
    });

    it('Hyperlink.prototype.setPathName', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setPathName('/path/name');

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

    it('Hyperlink.prototype.setSearch', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setSearch('?search=yes');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '?search=yes',
            hash: '',
            href: 'http://example.com/?search=yes',
            origin: 'http://example.com'
        });
    });

    it('Hyperlink.prototype.setHash', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        hyperlink.setHash('#results');

        assert.deepEqual(hyperlink, {
            protocol: 'http:',
            username: '',
            password: '',
            host: 'example.com',
            hostname: 'example.com',
            port: '',
            pathname: '/',
            search: '',
            hash: '#results',
            href: 'http://example.com/#results',
            origin: 'http://example.com'
        });
    });

    it('Hyperlink.prototype.toString', function () {
        var hyperlink = HyperlinkParser.parse('http://example.com');

        assert.deepStrictEqual(hyperlink.toString(), 'http://example.com/');
    });
});
