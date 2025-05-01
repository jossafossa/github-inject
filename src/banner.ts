export const getBanner = () => `// ==UserScript==
// @name         Github Enhancer
// @namespace    http://tampermonkey.net/
// @version      ${Date.now()}
// @description  Enhance your Github experience with additional features.
// @author       Jossafossa
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// @updateURL    https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// ==/UserScript==

/*
const GITHUB_CONFIG = {
  username: "joosthobma", 
  features: {
    lockMerge: true,
    status: true,
    copy: true,
    shortcuts: true,
    messages: true,
  },
}
*/
`;
