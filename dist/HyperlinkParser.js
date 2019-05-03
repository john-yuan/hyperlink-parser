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
    this.pathname = readAsString(pathname) || '/';
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
    this.search = readAsString(search);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9IeXBlcmxpbmsuanMiLCJsaWIvSHlwZXJsaW5rUGFyc2VyLmpzIiwibGliL3JlYWRBc1N0cmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIHJlYWRBc1N0cmluZyA9IHJlcXVpcmUoJy4vcmVhZEFzU3RyaW5nJyk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZ30gW3VybF0gVGhlIFVSTCB0byBwYXJzZS5cbiAqL1xuZnVuY3Rpb24gSHlwZXJsaW5rKHVybCkge1xuICAgIC8qKlxuICAgICAqIFRoZSB3aG9sZSBVUkwuXG4gICAgICovXG4gICAgdGhpcy5ocmVmID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JpZ2luIG9mIHRoZSBVUkwuIFNvbWV0aGluZyBsaWtlIGBodHRwczovL2V4YW1wbGUuY29tYFxuICAgICAqL1xuICAgIHRoaXMub3JpZ2luID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHJvdG9jb2wgb2YgdGhlIFVSTC4gU29tZXRoaW5nIGxpa2UgYGh0dHBzOmBcbiAgICAgKi9cbiAgICB0aGlzLnByb3RvY29sID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdXNlcm5hbWUgb2YgdGhlIFVSTC5cbiAgICAgKi9cbiAgICB0aGlzLnVzZXJuYW1lID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGFzc3dvcmQgb2YgdGhlIFVSTC5cbiAgICAgKi9cbiAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaG9zdCBvZiB0aGUgVVJMLiBJZiB0aGUgcG9ydCBpcyBub3QgZW1wdHksIHRoZSBob3N0IHdpbGwgY29udGFpbiB0aGUgcG9ydC4gRm9yIGV4YW1wbGU6IGBleGFtcGxlLmNvbTo4MDgwYFxuICAgICAqL1xuICAgIHRoaXMuaG9zdCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGhvc3QgbmFtZSBvZiB0aGUgVVJMLiBEb2VzIG5vdCBjb250YWluIHRoZSBwb3J0LlxuICAgICAqL1xuICAgIHRoaXMuaG9zdG5hbWUgPSAnJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwb3J0IG9mIHRoZSBVUkwuXG4gICAgICovXG4gICAgdGhpcy5wb3J0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGF0aCBuYW1lIG9mIHRoZSBVUkwuXG4gICAgICovXG4gICAgdGhpcy5wYXRobmFtZSA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHF1ZXJ5IHN0cmluZyBvZiB0aGUgVVJMLiBJZiBpdCBpcyBub3QgZW1wdHksIGl0IG11c3Qgc3RhcnQgd2l0aCBgP2AuIEZvciBleGFtcGxlOiBgP2xhbmc9amF2YXNjcmlwdGBcbiAgICAgKi9cbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGhhc2ggc3RyaW5nIG9mIHRoZSBVUkwuIElmIGl0IGlzIG5vdCBlbXB0eSwgaXQgbXVzdCBzdGFydCB3aXRoIGAjYC4gRm9yIGV4YW1wbGU6IGAjc2VhcmNoLXJlc3VsdGBcbiAgICAgKi9cbiAgICB0aGlzLmhhc2ggPSAnJztcblxuICAgIHVybCA9IHJlYWRBc1N0cmluZyh1cmwpO1xuXG4gICAgaWYgKHVybCkge1xuICAgICAgICB0aGlzLnNldEhyZWYodXJsKTtcbiAgICB9XG59XG5cbi8qKlxuICogU2V0IG5ldyBgaHJlZmAuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGFkdGUgYWxsIHRoZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIFRoZSBocmVmIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRIcmVmID0gZnVuY3Rpb24gKGhyZWYpIHtcbiAgICB2YXIgYXJyID0gbnVsbDtcbiAgICB2YXIgdG1wID0gbnVsbDtcbiAgICB2YXIgc3RyID0gcmVhZEFzU3RyaW5nKGhyZWYpO1xuICAgIHZhciBkb21haW4gPSBudWxsO1xuICAgIHZhciByZWdQcm90b2NvbCA9IC9eKFthLXpdW2EtejAtOVxcLVxcLlxcK10qOik/XFwvXFwvL2k7XG4gICAgdmFyIHJlZ1NlYXJjaEFuZEhhc2ggPSAvKFxcP1teI10qKT8oIy4qKT8kLztcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGF0IGhyZSBpcyBzdHJpbmcuXG4gICAgaHJlZiA9IHN0cjtcblxuICAgIC8vIElmIHRoZSB0ZXN0IHBhc3NlZCwgbWVhbnMgdGhhdCB0aGUgaHJlZiBpcyBhYnNvbHV0ZSB1cmwuXG4gICAgLy8gMS4gSXQgbWF5IGNvbnRhaW4gYSBwcm90b2NvbC5cbiAgICAvLyAyLiBJdCBtdXN0IGhhcyBhIGhvc3QuXG4gICAgLy8gMy4gSXQgbWF5IGNvbnRhaW4gdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAgIC8vIDQuIEl0IG1heSBjb250YWluIHBvcnQuXG4gICAgaWYgKHJlZ1Byb3RvY29sLnRlc3Qoc3RyKSkge1xuICAgICAgICB0aGlzLnByb3RvY29sID0gUmVnRXhwLiQxO1xuXG4gICAgICAgIC8vIFJlbW92ZSBwcm90b2NvbFxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShyZWdQcm90b2NvbCwgJycpO1xuICAgICAgICBhcnIgPSBzdHIuc3BsaXQoJy8nKTtcblxuICAgICAgICAvLyBTYXZlIHRoZSBkb21haW4gcGFydC5cbiAgICAgICAgZG9tYWluID0gYXJyWzBdO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZG9tYWluIHBhcnQuXG4gICAgICAgIGFyci5zaGlmdCgpO1xuICAgICAgICBzdHIgPSAnLycgKyBhcnIuam9pbignLycpO1xuICAgICAgICBhcnIgPSBudWxsO1xuXG4gICAgICAgIGlmIChkb21haW4uaW5kZXhPZignQCcpID4gLTEpIHtcbiAgICAgICAgICAgIGFyciA9IGRvbWFpbi5zcGxpdCgnQCcpO1xuICAgICAgICAgICAgdG1wID0gYXJyWzBdO1xuICAgICAgICAgICAgZG9tYWluID0gYXJyWzFdO1xuICAgICAgICAgICAgYXJyID0gdG1wLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lID0gYXJyWzBdO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9IGFyclsxXSB8fCAnJztcbiAgICAgICAgICAgIGFyciA9IG51bGw7XG4gICAgICAgICAgICB0bXAgPSBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51c2VybmFtZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgYXJyID0gZG9tYWluLnNwbGl0KCc6Jyk7XG4gICAgICAgIHRoaXMuaG9zdCA9IGRvbWFpbjtcbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9IGFyclswXTtcbiAgICAgICAgdGhpcy5wb3J0ID0gYXJyWzFdIHx8ICcnO1xuICAgICAgICBhcnIgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHJvdG9jb2wgPSAnJztcbiAgICAgICAgdGhpcy51c2VybmFtZSA9ICcnO1xuICAgICAgICB0aGlzLnBhc3N3b3JkID0gJyc7XG4gICAgICAgIHRoaXMuaG9zdCA9ICcnO1xuICAgICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgICAgIHRoaXMucG9ydCA9ICcnO1xuICAgIH1cblxuICAgIHRoaXMucGF0aG5hbWUgPSBzdHIucmVwbGFjZShyZWdTZWFyY2hBbmRIYXNoLCAnJyk7XG5cbiAgICBpZiAocmVnU2VhcmNoQW5kSGFzaC50ZXN0KHN0cikpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBSZWdFeHAuJDE7XG4gICAgICAgIHRoaXMuaGFzaCA9IFJlZ0V4cC4kMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgICAgICB0aGlzLmhhc2ggPSAnJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgcHJvdG9jb2xgIG9mIHRoZSB1cmwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYHByb3RvY29sYCwgYG9yaWdpbmAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvdG9jb2wgVGhlIHByb3RvY29sIHRvIHNldC4gU29tdGhpbmcgbGlrZSBgaHR0cHM6YFxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFByb3RvY29sID0gZnVuY3Rpb24gKHByb3RvY29sKSB7XG4gICAgdGhpcy5wcm90b2NvbCA9IHJlYWRBc1N0cmluZyhwcm90b2NvbCk7XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgdXNlcm5hbWVgIG9mIHRoZSBVUkwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYHVzZXJuYW1lYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1c2VybmFtZSBUaGUgdXNlciBuYW1lIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRVc2VyTmFtZSA9IGZ1bmN0aW9uICh1c2VybmFtZSkge1xuICAgIHRoaXMudXNlcm5hbWUgPSByZWFkQXNTdHJpbmcodXNlcm5hbWUpO1xuICAgIHRoaXMuaHJlZiA9IHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGBwYXNzd29yZGAgb2YgdGhlIFVSTC4gQ2FsbCB0aGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSBgcGFzc3dvcmRgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIFRoZSB1c2VyIG5hbWUgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFBhc3N3b3JkID0gZnVuY3Rpb24gKHBhc3N3b3JkKSB7XG4gICAgdGhpcy5wYXNzd29yZCA9IHJlYWRBc1N0cmluZyhwYXNzd29yZCk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYGhvc3RgIG9mIHRoZSB1cmwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGF0ZSBgaG9zdGAsIGBob3N0bmFtZWAsIGBwb3J0YCwgYG9yaWdpbmAsIGBocmVmYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaG9zdCBUaGUgaG9zdCB0byBzZXQuIFNvbWV0aGluZyBsaWtlIGBleGFtcGxlLmNvbTo4MDgwYC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRIb3N0ID0gZnVuY3Rpb24gKGhvc3QpIHtcbiAgICB2YXIgYXJyID0gbnVsbDtcblxuICAgIHRoaXMuaG9zdCA9IHJlYWRBc1N0cmluZyhob3N0KTtcblxuICAgIGFyciA9IHRoaXMuaG9zdC5zcGxpdCgnOicpO1xuXG4gICAgdGhpcy5ob3N0bmFtZSA9IGFyclswXTtcbiAgICB0aGlzLnBvcnQgPSBhcnJbMV0gfHwgJyc7XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gdGhpcy5wcm90b2NvbCArICcvLycgKyB0aGlzLmhvc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgaG9zdG5hbWVgIG9mIHRoZSB1cmwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYGhvc3RuYW1lYCwgYGhvc3RgLCBgb3JpZ2luYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBob3N0bmFtZSBUaGUgaG9zdCBuYW1lIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRIb3N0TmFtZSA9IGZ1bmN0aW9uIChob3N0bmFtZSkge1xuICAgIHRoaXMuaG9zdG5hbWUgPSByZWFkQXNTdHJpbmcoaG9zdG5hbWUpO1xuXG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgICB0aGlzLmhvc3QgPSB0aGlzLmhvc3RuYW1lICsgJzonICsgdGhpcy5wb3J0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaG9zdCA9IHRoaXMuaG9zdG5hbWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICB0aGlzLm9yaWdpbiA9IHRoaXMucHJvdG9jb2wgKyAnLy8nICsgdGhpcy5ob3N0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3JpZ2luID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYHBvcnRgIG9mIHRoZSB1cmwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYHBvcnRgLCBgaG9zdGAsIGBvcmlnaW5gLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBvcnQgVGhlIHBvcnQgdG8gc2V0LlxuICogQHJldHVybnMge1RoaXNUeXBlfVxuICovXG5IeXBlcmxpbmsucHJvdG90eXBlLnNldFBvcnQgPSBmdW5jdGlvbiAocG9ydCkge1xuICAgIHRoaXMucG9ydCA9IHJlYWRBc1N0cmluZyhwb3J0KTtcblxuICAgIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdCA9IHRoaXMuaG9zdG5hbWUgKyAnOicgKyB0aGlzLnBvcnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhvc3QgPSB0aGlzLmhvc3RuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG9zdCkge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW4gPSB0aGlzLnByb3RvY29sICsgJy8vJyArIHRoaXMuaG9zdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgcGF0aG5hbWVgIG9mIHRoZSBVUkwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYHBhdGhuYW1lYCwgYGhyZWZgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRobmFtZSBUaGUgcGF0aCBuYW1lIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRQYXRoTmFtZSA9IGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSByZWFkQXNTdHJpbmcocGF0aG5hbWUpIHx8ICcvJztcbiAgICB0aGlzLmhyZWYgPSB0aGlzLnRvU3RyaW5nKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgc2VhcmNoYCBvZiB0aGUgVVJMLiBDYWxsIHRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIGBzZWFyY2hgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaCBUaGUgc2VhcmNoIHN0cmluZyB0byBzZXQuXG4gKiBAcmV0dXJucyB7VGhpc1R5cGV9XG4gKi9cbkh5cGVybGluay5wcm90b3R5cGUuc2V0U2VhcmNoID0gZnVuY3Rpb24gKHNlYXJjaCkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVhZEFzU3RyaW5nKHNlYXJjaCk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgYGhhc2hgIG9mIHRoZSBVUkwuIENhbGwgdGhpcyBtZXRob2Qgd2lsbCB1cGRhdGUgYGhhc2hgLCBgaHJlZmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGhhc2ggVGhlIGhhc2ggc3RyaW5nIHRvIHNldC5cbiAqIEByZXR1cm5zIHtUaGlzVHlwZX1cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS5zZXRIYXNoID0gZnVuY3Rpb24gKGhhc2gpIHtcbiAgICB0aGlzLmhhc2ggPSByZWFkQXNTdHJpbmcoaGFzaCk7XG4gICAgdGhpcy5ocmVmID0gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgd2hvbGUgVVJMLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHdob2xlIFVSTC5cbiAqL1xuSHlwZXJsaW5rLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICBpZiAodGhpcy5ob3N0KSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICBzdHIgPSB0aGlzLnVzZXJuYW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIgKyAnOicgKyB0aGlzLnBhc3N3b3JkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHIpIHtcbiAgICAgICAgICAgIHN0ciArPSAnQCc7XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gdGhpcy5wcm90b2NvbCArICcvLycgKyBzdHIgKyB0aGlzLmhvc3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0ciArIHRoaXMucGF0aG5hbWUgKyB0aGlzLnNlYXJjaCArIHRoaXMuaGFzaDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSHlwZXJsaW5rO1xuIiwidmFyIEh5cGVybGluayA9IHJlcXVpcmUoJy4vSHlwZXJsaW5rJyk7XG52YXIgdmVyc2lvbiA9ICcwLjAuMS1hbHBoYS4xJztcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gVVJMLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIHVybCB0byBwYXJzZS5cbiAqIEByZXR1cm5zIHtIeXBlcmxpbmt9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgYEh5cGVybGlua2AuXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKHVybCkge1xuICAgIHJldHVybiBuZXcgSHlwZXJsaW5rKHVybCk7XG59XG5cbmV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb247XG5leHBvcnRzLkh5cGVybGluayA9IEh5cGVybGluaztcbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbiIsIi8qKlxuICogVGhlIGZ1bmN0aW9uIHRvIGNvbnZlcnQgdmFyaWFibGUgdG8gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7YW55fSBzdHIgVGhlIHZhcmlhYmxlIHRoYXQgbmVlZCB0byBiZSByZWFkIGFzIHN0cmluZy4gSWYgaXQgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLCBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0b1xuICogZW1wdHkgc3RyaW5nLiBJZiBpcyBub3Qgc3RyaW5nLCBpdCB3aWxsIGJlIGNvbnZlcnRlZCB0byBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gcmVhZEFzU3RyaW5nKHN0cikge1xuICAgIGlmIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3RyID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gJycgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhZEFzU3RyaW5nO1xuIl19
