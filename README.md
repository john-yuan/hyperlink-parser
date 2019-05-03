# HyperlinkParser.js

[![npm version](https://img.shields.io/npm/v/hyperlink-parser.svg)](https://www.npmjs.com/package/hyperlink-parser)
[![Build Status](https://travis-ci.org/john-yuan/HyperlinkParser.js.svg?branch=master)](https://travis-ci.org/john-yuan/HyperlinkParser.js)
[![install size](https://packagephobia.now.sh/badge?p=hyperlink-parser)](https://packagephobia.now.sh/result?p=hyperlink-parser)
[![npm downloads](https://img.shields.io/npm/dm/hyperlink-parser.svg)](http://npm-stat.com/charts.html?package=hyperlink-parser)

HyperlinkParser.js is an util to parse the URLs. Can be used in Node.js and the browsers. The properties of the parsed URL is same
as the properties of [HTMLHyperlinkElementUtils](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils#Properties).
For more details, see the example in the following section.

## Installation

```sh
npm i hyperlink-parser
```

## Example

```js
var HyperlinkParser = require('hyperlink-parser');
var url = 'https://user:pass@example.com:8080/search?q=javascript#results';

/**
 * @type {HyperlinkParser.Hyperlink}
 */
var hyperlink = HyperlinkParser.parse(url);
```

The `hyperlink` is an instance of `HyperlinkParser.Hyperlink` which holds the following informations:

```json
{
    "href": "https://user:pass@example.com:8080/search?q=javascript#results",
    "origin": "https://example.com:8080",
    "protocol": "https:",
    "username": "user",
    "password": "pass",
    "host": "example.com:8080",
    "hostname": "example.com",
    "port": "8080",
    "pathname": "/search",
    "search": "?q=javascript",
    "hash": "#results"
}
```

## API

Do not modify the properties of the Hyperlink instance directly, because some properties has dependencies on the others.
The best way to update the properties is using the setter methods, which will handle the dependencies among them. All
the APIs are listed as follow:

* HyperlinkParser.version
* HyperlinkParser.parse(url)
* Hyperlink.prototype.constructor([url])
* Hyperlink.prototype.setHref(href)
* Hyperlink.prototype.setProtocol(protocol)
* Hyperlink.prototype.setUserName(username)
* Hyperlink.prototype.setPassword(password)
* Hyperlink.prototype.setHost(host)
* Hyperlink.prototype.setHostName(hostname)
* Hyperlink.prototype.setPort(port)
* Hyperlink.prototype.setPathName(pathname)
* Hyperlink.prototype.setSearch(search)
* Hyperlink.prototype.setHash(hash)
* Hyperlink.prototype.toString()

As you can see, there is no setter method to modify the `origin` property. If you want to modify the `origin` property,
call `setProtocol(protocol)` and `setHost(host)`.

## Dev commands

```sh
# Start local server and compiler
npm run dev

# Build the release bundle
npm run build

# Run test
npm test
```

## License

[MIT](./LICENSE "MIT")
