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
    this.pathname = readAsString(pathname);
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
