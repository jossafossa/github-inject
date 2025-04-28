// ==UserScript==
// @name         Github test
// @namespace    http://tampermonkey.net/
// @version      1745832056546
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// @updateURL    https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// ==/UserScript==

(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const c=`/*
Comments:
- outline:red = not responded
- outline:orange = responded
- outline:green = responded with commit

page: 
- border:red = change requested
- border:orange = status:test
- border:green = tested
*/

:root {
  --f-purple: rgb(167, 48, 161);
  --f-red: rgb(231, 12, 8);
  --f-orange: rgb(236, 164, 6);
  --f-green: rgb(21, 194, 56);
  --f-purple-border: rgb(141, 78, 138);
  --f-red-border: rgb(168, 43, 41);
  --f-orange-border: rgb(210 153 34);
  --f-green-border: rgb(35 134 54);
}

/* 
-- OUTLINE COMMENTS --
 */

/* configure an outline for comments */
.review-thread-component {
  outline: var(--comment-outline, 2px solid var(--f-red-border));
  opacity: var(--comment-opacity);
  border: none !important;
}

/* always show the comment   */
.js-comment-container:hover {
  opacity: 1;
}

/* set the comment to orange when I commented last */
:where(
    .review-thread-component:has(
        .js-comments-holder > div:nth-last-child(1) img[src*="175005199"]
      )
  ) {
  --comment-outline: 2px solid var(--f-orange-border);
  transition: 0.15s ease;
}

/* gray out the comment and mark it green when i commented last with a commit hash */
:where(
    .review-thread-component:has(
        .js-comments-holder > div:nth-last-child(1) img[src*="175005199"]
      ):has(
        .js-comments-holder > div:nth-last-child(1) .commit-link,
        [href*="/compare/"]
      )
  ) {
  --comment-outline: 2px solid var(--f-green-border);
  --comment-opacity: 0.5;
}

/* 
-- DRAFT BUTTON COLOR --
*/

/* outline the tag button with red */
[reviewable_state="draft"] {
  outline: 1rem solid var(--f-purple);
}

/* 
-- BODY BORDER COLOR --
*/

body {
  --body-color: transparent;
  border-left: 1rem solid var(--body-color) !important;
}

/* The body color is orange. when a tag with qa-test is applied */
body:has(
    .discussion-sidebar-item [data-name*="QA-Test"],
    .discussion-sidebar-item[data-name*="qa-test"]
  ) {
  --body-color: var(--f-orange);
}

/* The body color is green when a tester left a comment  */
body:has(.author[href*="vandergeest"]) {
  --body-color: var(--f-green);
}

/* The body color is red when the PR is in draft */
body:has([reviewable_state="draft"]) {
  --body-color: var(--f-red);
}

/* The body color is red when the PR has pipeline issues */
body:has(.merge-status-item .color-fg-danger) {
  --body-color: var(--f-red);
}

/* 
-- EXTRA QUALITY OF LIFE CHANGES --
 */

/* add absolute time */
relative-time:after {
  font-size: 70%;
  content: " " attr(datetime);
  font-weight: bold;
  opacity: 0.5;
}

/* resize the sidebar */
.Layout-sidebar {
  resize: horizontal;
}

/* hide draftS IN PR List */
.js-issue-row:has([aria-label*="Draft"], [href*="dependabot"]):not(:hover) {
  opacity: 0.4;
}

/* disable the merge button for PR that are not from me */
#discussion_bucket:has(.TimelineItem:nth-child(1):has([alt*="joosthobma"]))
  .merge-message
  .BtnGroup:not(:hover) {
  opacity: 0.2;
  cursor: not-allowed;
}

/* 
-- LOCK MERGE --
 */
#lock-merge {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
}

/*
-- MESSAGES --
*/

.partial-pull-merging-analytics-js section + div:before {
  content: var(--message);
  padding: 8px;
  background-color: var(--f-red-border);
  color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
}

body:has(#lock-merge:checked) {
  --message: "Merging is blocked";
}

body:has([title*="fixup!"]) {
  --message: "Please rebase fixups before merging";
}

body:has(#lock-merge:checked),
body:has([title*="fixup!"]) {
  .partial-pull-merging-analytics-js
    section
    + div
    [class*="prc-Button-ButtonBase"] {
    opacity: 0.2;
    pointer-events: none;
  }
}

body:has(
    #discussion_bucket:has(.TimelineItem:nth-child(1):has([alt*="joosthobma"]))
      .merge-message
      .BtnGroup:not(:hover)
  ) {
  --message: "This is not your PR to merge!";
}
`,l=()=>document.querySelector(".gh-header-meta [title='Status: Merged']")?"merged":document.querySelector("[reviewable_state='draft']")?"draft":document.querySelector("[data-name*='QA-Test'], [data-name*='qa-test']")?"test":!1;let s=!1;const m=setInterval(()=>{const n=l();if(s!==n&&n){const t=`[${n.toUpperCase()}]`;s=!!n;const r=document.querySelector("h1 > bdi");r&&(r.innerHTML=`${t} ${r.innerHTML}`),document.title=`${t} ${document.title}`,clearInterval(m)}},100);function h(){const n=document.createElement("input");n.type="checkbox",n.id="lock-merge",document.body.appendChild(n),localStorage.getItem("checkboxState")==="checked"&&(n.checked=!0),n.addEventListener("change",()=>{localStorage.setItem("checkboxState",n.checked?"checked":"unchecked")})}document.addEventListener("click",()=>{document.querySelector("#lock-merge")||h()});document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("details-collapsible summary a").forEach(n=>{var r;let t=document.createElement("span");t.innerHTML=`<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`,t.style.marginLeft="10px",t.style.cursor="pointer",t.style.textDecoration="underline",t.addEventListener("click",function(a){a.preventDefault(),navigator.clipboard.writeText(n.textContent??"").then(()=>{console.log("Copied: "+n.textContent)}).catch(e=>{console.error("Failed to copy: ",e)})}),(r=n.parentNode)==null||r.appendChild(t)})});const d=document.createElement("style");d.innerHTML=c;document.head.appendChild(d);
