export const getBanner = () => `// ==UserScript==
// @name          Github Enhancer
// @namespace     http://tampermonkey.net/
// @version       ${Date.now()}
// @description   Enhance your Github experience with additional features.
// @author        Jossafossa
// @match         https://github.com/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant         none
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @downloadURL   https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// @updateURL     https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// ==/UserScript==

`;
