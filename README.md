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
import HyperlinkParser from 'hyperlink-parser';

const url = 'https://user:pass@example.com:8080/search?q=javascript#results';
const hyperlink = HyperlinkParser.parse(url);

console.log(HyperlinkParser.stringify(hyperlink) === url); // true
```

The `hyperlink` is a plain object which contains the following data:

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

Also you can import `parse` and `stringify` independently like below:

```js
import { parse, stringify, Hyperlink } from 'hyperlink-parser';
```

`Hyperlink` is the interface for hyperlink of which the definition is:

```ts
interface Hyperlink {
  href: string;
  origin: string;
  protocol: string;
  username: string;
  password: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
}
```

Plus, the bundle is an UMD module, so you can load it with the script tag:

```html
<script src="./dist/HyperlinkParser.js"></script>
<script>
  var hyperlink = HyperlinkParser.parse(location.href);
</script>
```

## License

[MIT](./LICENSE "MIT License")
