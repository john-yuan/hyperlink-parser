!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).HyperlinkParser=e()}(function(){return function n(i,o,s){function f(r,e){if(!o[r]){if(!i[r]){var t="function"==typeof require&&require;if(!e&&t)return t(r,!0);if(a)return a(r,!0);throw(t=new Error("Cannot find module '"+r+"'")).code="MODULE_NOT_FOUND",t}t=o[r]={exports:{}},i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,n,i,o,s)}return o[r].exports}for(var a="function"==typeof require&&require,e=0;e<s.length;e++)f(s[e]);return f}({1:[function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]});t.__esModule=!0;var i=e("./parse"),o=e("./stringify");n(t,e("./parse"),"parse"),n(t,e("./stringify"),"stringify"),t.default={parse:i.parse,stringify:o.stringify}},{"./parse":2,"./stringify":3}],2:[function(e,r,t){"use strict";t.__esModule=!0,t.parse=void 0;var o=e("./stringify");t.parse=function(e){var r={href:"",origin:"",protocol:"",username:"",password:"",host:"",hostname:"",port:"",pathname:"",search:"",hash:""},t=e,n=/(#.*)$/,i=t.match(n);i&&(r.hash=i[1],t=t.replace(n,""));e=/(\?.*)$/,i=t.match(e);i&&(r.search=i[1],t=t.replace(e,""));n=/^([a-z][a-z0-9\-.+]*:)?\/\//i,i=t.match(n);i&&(t=t.replace(n,""),r.protocol=i[1]||"");e=t.split("/"),n=e.shift();return r.pathname="/"+e.join("/"),n&&(e=((t=1<(i=n.split("@")).length)&&i.shift()||"").split(":"),n=(t?i.join("@"):n).split(":"),r.username=e[0],r.password=e[1]||"",r.host=n.join(":"),r.hostname=n[0],r.port=n[1]||""),r.host&&(r.origin=r.protocol+"//"+r.host),r.href=o.stringify(r),r}},{"./stringify":3}],3:[function(e,r,t){"use strict";t.__esModule=!0,t.stringify=void 0,t.stringify=function(e){var r=e.protocol,t=e.username,n=e.password,i=e.hostname,o=e.port,s=e.pathname,f=e.search,a=e.hash,e="";return r&&(e=e+r+"//"),t&&(e+=t,n&&(e=e+":"+n),e+="@"),i&&(e+=i,o&&(e=e+":"+o)),e+=s||"/",f&&(e+=f),a&&(e+=a),e}},{}]},{},[1])(1)});