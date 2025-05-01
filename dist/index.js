// ==UserScript==
// @name         Github test
// @namespace    http://tampermonkey.net/
// @version      1746104271703
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// @updateURL    https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// ==/UserScript==

(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const m=()=>{document.querySelectorAll("details-collapsible summary a").forEach(e=>{var o;let n=document.createElement("span");n.innerHTML=`<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`,n.style.marginLeft="10px",n.style.cursor="pointer",n.style.textDecoration="underline",n.addEventListener("click",function(s){s.preventDefault(),navigator.clipboard.writeText(e.textContent??"").then(()=>{console.log("Copied: "+e.textContent)}).catch(t=>{console.error("Failed to copy: ",t)})}),(o=e.parentNode)==null||o.appendChild(n)})},i="lock-merge",u=()=>{const e=document.createElement("input");e.type="checkbox",e.id="lock-merge",document.body.appendChild(e),localStorage.getItem(i)==="checked"&&(e.checked=!0),e.addEventListener("change",()=>{localStorage.setItem(i,e.checked?"checked":"unchecked")})},c=async e=>new Promise(n=>{const o=setInterval(()=>{const s=document.querySelector(e);s&&(clearInterval(o),n(s))},100)}),d=(...e)=>{console.log("%c[github-extensions]%c","color: #f0db4f; font-weight: bold; background: #323330; padding: 2px 5px; border-radius: 3px;","color: #fff; font-weight: normal; background: #323330; padding: 2px 5px; border-radius: 3px;",...e)},h=()=>{const e=document.querySelector('.gh-header-meta .commit-ref:not(:has([href*="master"]))');return e?e.textContent:!1},f=()=>{const e=document.querySelector(".partial-pull-merging-analytics-js section + div");if(!e)return{};const n=document.createElement("div");e.prepend(n),n.classList.add("fs-errors");const o=document.createElement("div");return e.prepend(o),o.classList.add("fs-messages"),{errors:n,messages:o}},p=e=>{const n=document.createElement("span");return n.classList.add("fs-message"),n.innerHTML=e,n},g=()=>{const e=h();if(e)return p(`<a href='https://github.com/simplicate-software/frontend/actions?query=branch:${e}'>Actions of this PR</a>`)},b=()=>{const{messages:e}=f();if(!e)return;const n=g();n&&e.append(n)},y=()=>{b()},v=()=>document.querySelector(".gh-header-meta [title='Status: Merged']")?"merged":document.querySelector("[reviewable_state='draft']")?"draft":document.querySelector("[data-name*='QA-Test'], [data-name*='qa-test']")?"test":!1,w=()=>{let e=!1;const n=setInterval(()=>{const o=v();if(e!==o&&o){const s=`[${o.toUpperCase()}]`;e=!!o;const t=document.querySelector("h1 > bdi");t&&(t.innerHTML=`${s} ${t.innerHTML}`),document.title=`${s} ${document.title}`,clearInterval(n)}},1e3)},L=`/*
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
  --f-merge: #8957e5;
  --f-merge-border: #8957e5;
  --f-error: rgb(231, 12, 8);
  --f-error-border: rgb(168, 43, 41);
  --f-warning: rgb(236, 164, 6);
  --f-warning-border: rgb(210 153 34);
  --f-positive: #238636;
  --f-positive-border: #21672e;
  --f-info: #4493f8;
  --f-info-border: #1f3356;
}

/* 
-- OUTLINE COMMENTS --
 */

/* configure an outline for comments */
.review-thread-component {
  --comment-outline-color: var(--f-error-border);
  outline: 2px solid var(--comment-outline-color);
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
  --comment-outline: 2px solid var(--f-warning-border);
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
  --comment-outline-color: var(--f-positive-border);
  --comment-opacity: 0.5;
}

.review-thread-component[data-resolved="true"] {
  --comment-outline-color: var(--f-positive-border);
}

/* 
-- DRAFT BUTTON COLOR --
*/

/* outline the tag button with red */
[reviewable_state="draft"] {
  outline: 1rem solid var(--f-merge);
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
  --body-color: var(--f-warning);
}

/* The body color is green when a tester left a comment  */
body:has(.author[href*="vandergeest"]) {
  --body-color: var(--f-positive);
}

/* The body color is red when the PR is in draft */
body:has([reviewable_state="draft"]) {
  --body-color: var(--f-error);
}

/* The body color is red when the PR has pipeline issues */
body:has(.merge-status-item .color-fg-danger) {
  --body-color: var(--f-error);
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

.fs-messages:before,
.fs-errors:before,
.fs-error,
.fs-message {
  content: var(--message);
  padding: 8px;
  background-color: var(--f-info-border);
  color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;

  a {
    color: inherit;
    text-decoration: underline;
  }
}

.fs-errors:before,
.fs-error {
  content: var(--error);
  background-color: var(--f-error-border);
}

body:has(#lock-merge:checked) {
  --error: "Merging is blocked";
}

body:has([title*="fixup!"]) {
  --error: "Please rebase fixups before merging";
}

%disabled-button {
  [class*="prc-Button-ButtonBase"] {
    opacity: 0.2;
    pointer-events: none;
    cursor: not-allowed;
  }
}

@container style(--error) {
  [class*="prc-Button-ButtonBase"] {
    @extend %disabled-button;
  }
}

body:has(.fs-error) {
  @extend %disabled-button;
}

body:not(
    body:has(.js-discussion > .TimelineItem:nth-child(1) [alt*="joosthobma"])
  ) {
  --error: "This is not your PR to merge!";
}
`,l=document.createElement("style");l.innerHTML=L;document.head.appendChild(l);const x=async()=>{d("github loaded"),u(),w(),m()};c(".timeline-comment-group").then(x);const E=async()=>{d("pipeline loaded"),y()};c("[class*='MergeBoxSectionHeader-module__wrapper']").then(E);
