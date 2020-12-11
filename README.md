# HyperlinkParser.js

[![npm version](https://img.shields.io/npm/v/hyperlink-parser.svg)](https://www.npmjs.com/package/hyperlink-parser)
[![Build Status](https://travis-ci.org/john-yuan/HyperlinkParser.js.svg?branch=master)](https://travis-ci.org/john-yuan/HyperlinkParser.js)
[![install size](https://packagephobia.now.sh/badge?p=hyperlink-parser)](https://packagephobia.now.sh/result?p=hyperlink-parser)
[![npm downloads](https://img.shields.io/npm/dm/hyperlink-parser.svg)](http://npm-stat.com/charts.html?package=hyperlink-parser)

HyperlinkParser.js is an util to parse the URLs. Can be used in Node.js and the browsers. The properties of the parsed URL is same as the properties of [HTMLHyperlinkElementUtils](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils#Properties). For more details, please read the following example.

## Installation

```sh
npm i hyperlink-parser
```

## Example

```js
import HyperlinkParser from 'hyperlink-parser'

const link = HyperlinkParser.parse('https://user:pass@example.com:8080/search?q=javascript#results")

console.log(link)
```

The result is a plain object containing following properties.

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

The stringify method is designed to build a url from an object, for example:

```
const url = HyperlinkParser.stringify({
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
})

console.log(url)

// https://user:pass@example.com:8080/search?q=javascript#results
```

## License

[MIT](./LICENSE "MIT License")
