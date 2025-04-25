
// ==UserScript==
// @name         Github test
// @namespace    http://tampermonkey.net/
// @version      1745582618427
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// @updateURL    https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.js
// ==/UserScript==

// ==/UserScript==

(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const d=()=>document.querySelector(".gh-header-meta [title='Status: Merged']")?"merged":document.querySelector("[reviewable_state='draft']")?"draft":document.querySelector("[data-name*='QA-Test'], [data-name*='qa-test']")?"test":!1;let s=!1;const l=setInterval(()=>{const t=d();if(s!==t&&t){const r=`[${t.toUpperCase()}]`;s=!!t;const n=document.querySelector("h1 > bdi");n&&(n.innerHTML=`${r} ${n.innerHTML}`),document.title=`${r} ${document.title}`,clearInterval(l)}},100);function u(){const t=document.createElement("input");t.type="checkbox",t.id="lock-merge",document.body.appendChild(t),localStorage.getItem("checkboxState")==="checked"&&(t.checked=!0),t.addEventListener("change",()=>{localStorage.setItem("checkboxState",t.checked?"checked":"unchecked")})}document.addEventListener("click",()=>{document.querySelector("#lock-merge")||u()});document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("details-collapsible summary a").forEach(t=>{var n;let r=document.createElement("span");r.innerHTML=`<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`,r.style.marginLeft="10px",r.style.cursor="pointer",r.style.textDecoration="underline",r.addEventListener("click",function(c){c.preventDefault(),navigator.clipboard.writeText(t.textContent??"").then(()=>{console.log("Copied: "+t.textContent)}).catch(e=>{console.error("Failed to copy: ",e)})}),(n=t.parentNode)==null||n.appendChild(r)})});const i=document.createElement("link");i.rel="stylesheet";i.href="https://raw.githubusercontent.com/jossafossa/github-inject/refs/heads/master/dist/index.css";i.type="text/css";document.head.appendChild(i);
