(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.HyperlinkParser = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var readAsString = require('./readAsString');

/**
 * @class
 * @param {string} [url] The URL to parse.
 */
function Hyperlink(url) {
    /**
     * The whole URL.
     */
    this.href = '';

    /**
     * The origin of the URL. Something like `https://example.com`
     */
    this.origin = '';

    /**
     * The protocol of the URL. Something like `https:`
     */
    this.protocol = '';

    /**
     * The username of the URL.
     */
    this.username = '';

    /**
     * The password of the URL.
     */
    this.password = '';

    /**
     * The host of the URL. If the port is not empty, the host will contain the port. For example: `example.com:8080`
     */
    this.host = '';

    /**
     * The host name of the URL. Does not contain the port.
     */
    this.hostname = '';

    /**
     * The port of the URL.
     */
    this.port = '';

    /**
     * The path name of the URL.
     */
    this.pathname = '';

    /**
     * The query string of the URL. If it is not empty, it must start with `?`. For example: `?lang=javascript`
     */
    this.search = '';

    /**
     * The hash string of the URL. If it is not empty, it must start with `#`. For example: `#search-result`
     */
    this.hash = '';

    url = readAsString(url);

    if (url) {
        this.setHref(url);
    }
}

/**
 * Set new `href`. Call this method will upadte all the properties.
 *
 * @param {string} href The href to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHref = function (href) {
    var arr = null;
    var tmp = null;
    var str = readAsString(href);
    var domain = null;
    var regProtocol = /^([a-z][a-z0-9\-\.\+]*:)?\/\//i;
    var regSearchAndHash = /(\?[^#]*)?(#.*)?$/;

    // Make sure that hre is string.
    href = str;

    // If the test passed, means that the href is absolute url.
    // 1. It may contain a protocol.
    // 2. It must has a host.
    // 3. It may contain username and password.
    // 4. It may contain port.
    if (regProtocol.test(str)) {
        this.protocol = RegExp.$1;

        // Remove protocol
        str = str.replace(regProtocol, '');
        arr = str.split('/');

        // Save the domain part.
        domain = arr[0];

        // Remove the domain part.
        arr.shift();
        str = '/' + arr.join('/');
        arr = null;

        if (domain.indexOf('@') > -1) {
            arr = domain.split('@');
            tmp = arr[0];
            domain = arr[1];
            arr = tmp.split(':');
            this.username = arr[0];
            this.password = arr[1] || '';
            arr = null;
            tmp = null;
        } else {
            this.username = '';
            this.password = '';
        }

        arr = domain.split(':');
        this.host = domain;
        this.hostname = arr[0];
        this.port = arr[1] || '';
        arr = null;
    } else {
        this.protocol = '';
        this.username = '';
        this.password = '';
        this.host = '';
        this.hostname = '';
        this.port = '';
    }

    this.pathname = str.replace(regSearchAndHash, '');

    if (regSearchAndHash.test(str)) {
        this.search = RegExp.$1;
        this.hash = RegExp.$2;
    } else {
        this.search = '';
        this.hash = '';
    }

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `protocol` of the url. Call this method will update `protocol`, `origin`, `href`.
 *
 * @param {string} protocol The protocol to set. Somthing like `https:`
 * @returns {ThisType}
 */
Hyperlink.prototype.setProtocol = function (protocol) {
    this.protocol = readAsString(protocol);

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `username` of the URL. Call this method will update `username`, `href`.
 *
 * @param {string} username The user name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setUserName = function (username) {
    this.username = readAsString(username);
    this.href = this.toString();

    return this;
};

/**
 * Set the `password` of the URL. Call this method will update `password`, `href`.
 *
 * @param {string} password The user name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPassword = function (password) {
    this.password = readAsString(password);
    this.href = this.toString();

    return this;
};

/**
 * Set the `host` of the url. Call this method will upate `host`, `hostname`, `port`, `origin`, `href`.
 *
 * @param {string} host The host to set. Something like `example.com:8080`.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHost = function (host) {
    var arr = null;

    this.host = readAsString(host);

    arr = this.host.split(':');

    this.hostname = arr[0];
    this.port = arr[1] || '';

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `hostname` of the url. Call this method will update `hostname`, `host`, `origin`, `href`.
 *
 * @param {string} hostname The host name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHostName = function (hostname) {
    this.hostname = readAsString(hostname);

    if (this.port) {
        this.host = this.hostname + ':' + this.port;
    } else {
        this.host = this.hostname;
    }

    if (this.host) {
        this.origin = this.protocol + '//' + this.host;
    } else {
        this.origin = '';
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `port` of the url. Call this method will update `port`, `host`, `origin`, `href`.
 *
 * @param {string} port The port to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPort = function (port) {
    this.port = readAsString(port);

    if (this.hostname) {
        if (this.port) {
            this.host = this.hostname + ':' + this.port;
        } else {
            this.host = this.hostname;
        }

        if (this.host) {
            this.origin = this.protocol + '//' + this.host;
        } else {
            this.origin = '';
        }
    }

    this.href = this.toString();

    return this;
};

/**
 * Set the `pathname` of the URL. Call this method will update `pathname`, `href`.
 *
 * @param {string} pathname The path name to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setPathName = function (pathname) {
    pathname = readAsString(pathname);

    if (pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }

    this.pathname = pathname;
    this.href = this.toString();

    return this;
};

/**
 * Set the `search` of the URL. Call this method will update `search`, `href`.
 *
 * @param {string} search The search string to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setSearch = function (search) {
    search = readAsString(search);

    if (search && search.charAt(0) !== '?') {
        search = '?' + search;
    }

    if (search === '?') {
        search = '';
    }

    this.search = search;
    this.href = this.toString();

    return this;
};

/**
 * Set the `hash` of the URL. Call this method will update `hash`, `href`.
 *
 * @param {string} hash The hash string to set.
 * @returns {ThisType}
 */
Hyperlink.prototype.setHash = function (hash) {
    hash = readAsString(hash);

    if (hash && hash.charAt(0) !== '#') {
        hash = '#' + hash;
    }

    if (hash === '#') {
        hash = '';
    }

    this.hash = readAsString(hash);
    this.href = this.toString();

    return this;
};

/**
 * Get the whole URL.
 *
 * @returns {string} Returns the whole URL.
 */
Hyperlink.prototype.toString = function () {
    var str = '';

    if (this.host) {
        if (this.username) {
            str = this.username;
        }
        if (this.password) {
            str = str + ':' + this.password;
        }
        if (str) {
            str += '@';
        }
        str = this.protocol + '//' + str + this.host;
    }

    return str + this.pathname + this.search + this.hash;
};

module.exports = Hyperlink;

},{"./readAsString":3}],2:[function(require,module,exports){
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

},{"./Hyperlink":1}],3:[function(require,module,exports){
/**
 * The function to convert variable to string.
 *
 * @param {any} str The variable that need to be read as string. If it is `null` or `undefined`, it will be converted to
 * empty string. If is not string, it will be converted to string.
 *
 * @returns {string}
 */
function readAsString(str) {
    if (str === null || str === undefined) {
        str = '';
    } else {
        str = '' + str;
    }
    return str;
}

module.exports = readAsString;

},{}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9IeXBlcmxpbmsuanMiLCJsaWIvSHlwZXJsaW5rUGFyc2VyLmpzIiwibGliL3JlYWRBc1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciByZWFkQXNTdHJpbmcgPSByZXF1aXJlKCcuL3JlYWRBc1N0cmluZycpO1xuXG4vKipcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmd9IFt1cmxdIFRoZSBVUkwgdG8gcGFyc2UuXG4gKi9cbmZ1bmN0aW9uIEh5cGVybGluayh1cmwpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgd2hvbGUgVVJMLlxuICAgICAqL1xuICAgIHRoaXMuaHJlZiA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG9yaWdpbiBvZiB0aGUgVVJMLiBTb21ldGhpbmcgbGlrZSBgaHR0cHM6Ly9leGFtcGxlLmNvbWBcbiAgICAgKi9cbiAgICB0aGlzLm9yaWdpbiA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHByb3RvY29sIG9mIHRoZSBVUkwuIFNvbWV0aGluZyBsaWtlIGBodHRwczpgXG4gICAgICovXG4gICAgdGhpcy5wcm90b2NvbCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHVzZXJuYW1lIG9mIHRoZSBVUkwuXG4gICAgICovXG4gICAgdGhpcy51c2VybmFtZSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBhc3N3b3JkIG9mIHRoZSBVUkwuXG4gICAgICovXG4gICAgdGhpcy5wYXNzd29yZCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGhvc3Qgb2YgdGhlIFVSTC4gSWYgdGhlIHBvcnQgaXMgbm90IGVtcHR5LCB0aGUgaG9zdCB3aWxsIGNvbnRhaW4gdGhlIHBvcnQuIEZvciBleGFtcGxlOiBgZXhhbXBsZS5jb206ODA4MGBcbiAgICAgKi9cbiAgICB0aGlzLmhvc3QgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBob3N0IG5hbWUgb2YgdGhlIFVSTC4gRG9lcyBub3QgY29udGFpbiB0aGUgcG9ydC5cbiAgICAgKi9cbiAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcG9ydCBvZiB0aGUgVVJMLlxuICAgICAqL1xuICAgIHRoaXMucG9ydCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBhdGggbmFtZSBvZiB0aGUgVVJMLlxuICAgICAqL1xuICAgIHRoaXMucGF0aG5hbWUgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBxdWVyeSBzdHJpbmcgb2YgdGhlIFVSTC4gSWYgaXQgaXMgbm90IGVtcHR5LCBpdCBtdXN0IHN0YXJ0IHdpdGggYD9gLiBGb3IgZXhhbXBsZTogYD9sYW5nPWphdmFzY3JpcHRgXG4gICAgICovXG4gICAgdGhpcy5zZWFyY2ggPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBoYXNoIHN0cmluZyBvZiB0aGUgVVJMLiBJZiBpdCBpcyBub3QgZW1wdHksIGl0IG11c3Qgc3RhcnQgd2l0aCBgI2AuIEZvciBleGFtcGxlOiBgI3NlYXJjaC1yZXN1bHRgXG4gICAgICovXG4gICAgdGhpcy5oYXNoID0gJyc7XG5cbiAgICB1cmwgPSByZWFkQXNTdHJpbmcodXJsKTtcblxuICAgIGlmICh1cmwpIHtcbiAgICAgICAgdGhpcy5zZXRIcmVmKHVybCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFNldCBuZXcgYGhyZWZgLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBhZHRlIGFsbCB0aGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZiBUaGUgaHJlZiB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0SHJlZiA9IGZ1bmN0aW9uIChocmVmKSB7XG4gICAgdmFyIGFyciA9IG51bGw7XG4gICAgdmFyIHRtcCA9IG51bGw7XG4gICAgdmFyIHN0ciA9IHJlYWRBc1N0cmluZyhocmVmKTtcbiAgICB2YXIgZG9tYWluID0gbnVsbDtcbiAgICB2YXIgcmVnUHJvdG9jb2wgPSAvXihbYS16XVthLXowLTlcXC1cXC5cXCtdKjopP1xcL1xcLy9pO1xuICAgIHZhciByZWdTZWFyY2hBbmRIYXNoID0gLyhcXD9bXiNdKik/KCMuKik/JC87XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhhdCBocmUgaXMgc3RyaW5nLlxuICAgIGhyZWYgPSBzdHI7XG5cbiAgICAvLyBJZiB0aGUgdGVzdCBwYXNzZWQsIG1lYW5zIHRoYXQgdGhlIGhyZWYgaXMgYWJzb2x1dGUgdXJsLlxuICAgIC8vIDEuIEl0IG1heSBjb250YWluIGEgcHJvdG9jb2wuXG4gICAgLy8gMi4gSXQgbXVzdCBoYXMgYSBob3N0LlxuICAgIC8vIDMuIEl0IG1heSBjb250YWluIHVzZXJuYW1lIGFuZCBwYXNzd29yZC5cbiAgICAvLyA0LiBJdCBtYXkgY29udGFpbiBwb3J0LlxuICAgIGlmIChyZWdQcm90b2NvbC50ZXN0KHN0cikpIHtcbiAgICAgICAgdGhpcy5wcm90b2NvbCA9IFJlZ0V4cC4kMTtcblxuICAgICAgICAvLyBSZW1vdmUgcHJvdG9jb2xcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocmVnUHJvdG9jb2wsICcnKTtcbiAgICAgICAgYXJyID0gc3RyLnNwbGl0KCcvJyk7XG5cbiAgICAgICAgLy8gU2F2ZSB0aGUgZG9tYWluIHBhcnQuXG4gICAgICAgIGRvbWFpbiA9IGFyclswXTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGRvbWFpbiBwYXJ0LlxuICAgICAgICBhcnIuc2hpZnQoKTtcbiAgICAgICAgc3RyID0gJy8nICsgYXJyLmpvaW4oJy8nKTtcbiAgICAgICAgYXJyID0gbnVsbDtcblxuICAgICAgICBpZiAoZG9tYWluLmluZGV4T2YoJ0AnKSA+IC0xKSB7XG4gICAgICAgICAgICBhcnIgPSBkb21haW4uc3BsaXQoJ0AnKTtcbiAgICAgICAgICAgIHRtcCA9IGFyclswXTtcbiAgICAgICAgICAgIGRvbWFpbiA9IGFyclsxXTtcbiAgICAgICAgICAgIGFyciA9IHRtcC5zcGxpdCgnOicpO1xuICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IGFyclswXTtcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSBhcnJbMV0gfHwgJyc7XG4gICAgICAgICAgICBhcnIgPSBudWxsO1xuICAgICAgICAgICAgdG1wID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXNlcm5hbWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMucGFzc3dvcmQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGFyciA9IGRvbWFpbi5zcGxpdCgnOicpO1xuICAgICAgICB0aGlzLmhvc3QgPSBkb21haW47XG4gICAgICAgIHRoaXMuaG9zdG5hbWUgPSBhcnJbMF07XG4gICAgICAgIHRoaXMucG9ydCA9IGFyclsxXSB8fCAnJztcbiAgICAgICAgYXJyID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3RvY29sID0gJyc7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5wYXNzd29yZCA9ICcnO1xuICAgICAgICB0aGlzLmhvc3QgPSAnJztcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgICAgICB0aGlzLnBvcnQgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLnBhdGhuYW1lID0gc3RyLnJlcGxhY2UocmVnU2VhcmNoQW5kSGFzaCwgJycpO1xuXG4gICAgaWYgKHJlZ1NlYXJjaEFuZEhhc2gudGVzdChzdHIpKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gUmVnRXhwLiQxO1xuICAgICAgICB0aGlzLmhhc2ggPSBSZWdFeHAuJDI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICAgICAgdGhpcy5oYXNoID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5ob3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHByb3RvY29sYCBvZiB0aGUgdXJsLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBwcm90b2NvbGAsIGBvcmlnaW5gLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3RvY29sIFRoZSBwcm90b2NvbCB0byBzZXQuIFNvbXRoaW5nIGxpa2UgYGh0dHBzOmBcbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRQcm90b2NvbCA9IGZ1bmN0aW9uIChwcm90b2NvbCkge1xuICAgIHRoaXMucHJvdG9jb2wgPSByZWFkQXNTdHJpbmcocHJvdG9jb2wpO1xuXG4gICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5ob3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHVzZXJuYW1lYCBvZiB0aGUgVVJMLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGB1c2VybmFtZWAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXNlcm5hbWUgVGhlIHVzZXIgbmFtZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0VXNlck5hbWUgPSBmdW5jdGlvbiAodXNlcm5hbWUpIHtcbiAgICB0aGlzLnVzZXJuYW1lID0gcmVhZEFzU3RyaW5nKHVzZXJuYW1lKTtcbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgcGFzc3dvcmRgIG9mIHRoZSBVUkwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYHBhc3N3b3JkYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBUaGUgdXNlciBuYW1lIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRQYXNzd29yZCA9IGZ1bmN0aW9uIChwYXNzd29yZCkge1xuICAgIHRoaXMucGFzc3dvcmQgPSByZWFkQXNTdHJpbmcocGFzc3dvcmQpO1xuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBob3N0YCBvZiB0aGUgdXJsLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBhdGUgYGhvc3RgLCBgaG9zdG5hbWVgLCBgcG9ydGAsIGBvcmlnaW5gLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhvc3QgVGhlIGhvc3QgdG8gc2V0LiBTb21ldGhpbmcgbGlrZSBgZXhhbXBsZS5jb206ODA4MGAuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0SG9zdCA9IGZ1bmN0aW9uIChob3N0KSB7XG4gICAgdmFyIGFyciA9IG51bGw7XG5cbiAgICB0aGlzLmhvc3QgPSByZWFkQXNTdHJpbmcoaG9zdCk7XG5cbiAgICBhcnIgPSB0aGlzLmhvc3Quc3BsaXQoJzonKTtcblxuICAgIHRoaXMuaG9zdG5hbWUgPSBhcnJbMF07XG4gICAgdGhpcy5wb3J0ID0gYXJyWzFdIHx8ICcnO1xuXG4gICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5ob3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYGhvc3RuYW1lYCBvZiB0aGUgdXJsLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBob3N0bmFtZWAsIGBob3N0YCwgYG9yaWdpbmAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaG9zdG5hbWUgVGhlIGhvc3QgbmFtZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0SG9zdE5hbWUgPSBmdW5jdGlvbiAoaG9zdG5hbWUpIHtcbiAgICB0aGlzLmhvc3RuYW1lID0gcmVhZEFzU3RyaW5nKGhvc3RuYW1lKTtcblxuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgICAgdGhpcy5ob3N0ID0gdGhpcy5ob3N0bmFtZSArICc6JyArIHRoaXMucG9ydDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhvc3QgPSB0aGlzLmhvc3RuYW1lO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3QpIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICsgJy8vJyArIHRoaXMuaG9zdDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBwb3J0YCBvZiB0aGUgdXJsLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBwb3J0YCwgYGhvc3RgLCBgb3JpZ2luYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwb3J0IFRoZSBwb3J0IHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRQb3J0ID0gZnVuY3Rpb24gKHBvcnQpIHtcbiAgICB0aGlzLnBvcnQgPSByZWFkQXNTdHJpbmcocG9ydCk7XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgICAgICBpZiAodGhpcy5wb3J0KSB7XG4gICAgICAgICAgICB0aGlzLmhvc3QgPSB0aGlzLmhvc3RuYW1lICsgJzonICsgdGhpcy5wb3J0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ob3N0ID0gdGhpcy5ob3N0bmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmhvc3QpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbiA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHBhdGhuYW1lYCBvZiB0aGUgVVJMLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBwYXRobmFtZWAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aG5hbWUgVGhlIHBhdGggbmFtZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0UGF0aE5hbWUgPSBmdW5jdGlvbiAocGF0aG5hbWUpIHtcbiAgICBwYXRobmFtZSA9IHJlYWRBc1N0cmluZyhwYXRobmFtZSk7XG5cbiAgICBpZiAocGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICAgICAgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgICB9XG5cbiAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHNlYXJjaGAgb2YgdGhlIFVSTC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgc2VhcmNoYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWFyY2ggVGhlIHNlYXJjaCBzdHJpbmcgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFNlYXJjaCA9IGZ1bmN0aW9uIChzZWFyY2gpIHtcbiAgICBzZWFyY2ggPSByZWFkQXNTdHJpbmcoc2VhcmNoKTtcblxuICAgIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSB7XG4gICAgICAgIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoID09PSAnPycpIHtcbiAgICAgICAgc2VhcmNoID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5zZWFyY2ggPSBzZWFyY2g7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYGhhc2hgIG9mIHRoZSBVUkwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYGhhc2hgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggVGhlIGhhc2ggc3RyaW5nIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRIYXNoID0gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICBoYXNoID0gcmVhZEFzU3RyaW5nKGhhc2gpO1xuXG4gICAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykge1xuICAgICAgICBoYXNoID0gJyMnICsgaGFzaDtcbiAgICB9XG5cbiAgICBpZiAoaGFzaCA9PT0gJyMnKSB7XG4gICAgICAgIGhhc2ggPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmhhc2ggPSByZWFkQXNTdHJpbmcoaGFzaCk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgd2hvbGUgVVJMLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHdob2xlIFVSTC5cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICBzdHIgPSB0aGlzLnVzZXJuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIgKyAnOicgKyB0aGlzLnBhc3N3b3JkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHIpIHtcbiAgICAgICAgICAgIHN0ciArPSAnQCc7XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gdGhpcy5wcm90b2NvbCArICcvLycgKyBzdHIgKyB0aGlzLmhvc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0ciArIHRoaXMucGF0aG5hbWUgKyB0aGlzLnNlYXJjaCArIHRoaXMuaGFzaDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSHlwZXJsaW5rO1xuIiwidmFyIEh5cGVybGluayA9IHJlcXVpcmUoJy4vSHlwZXJsaW5rJyk7XG52YXIgdmVyc2lvbiA9ICcwLjAuMS1hbHBoYS4xJztcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gVVJMLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtIeXBlcmxpbmt9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgYEh5cGVybGlua2AuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xuICAgIHJldHVybiBuZXcgSHlwZXJsaW5rKHVybCk7XG59XG5cbmV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG5leHBvcnRzLkh5cGVybGluayA9IEh5cGVybGluaztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbiIsIi8qKlxuICogVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQgdmFyaWFibGUgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7YW55fSBzdHIgVGhlIHZhcmlhYmxlIHRoYXQgbmVlZCB0byBiZSByZWFkIGFzIHN0cmluZy4gSWYgaXQgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLCBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0b1xuICogZW1wdHkgc3RyaW5nLiBJZiBpcyBub3Qgc3RyaW5nLCBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVhZEFzU3RyaW5nKHN0cikge1xuICAgIGlmIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RyID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gJycgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhZEFzU3RyaW5nO1xuIl19
