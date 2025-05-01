import { loadLockMerge } from "./lockMerge";
import { loadMessages } from "./messages";
import { loadStatus } from "./status";
import styles from "./styles.scss?raw";
import { waitFor } from "./utils";

// insert a style
const style = document.createElement("style");
style.innerHTML = styles;
document.head.appendChild(style);

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .querySelectorAll("details-collapsible summary a")
//     .forEach((anchor) => {
//       // Create the copy link
//       let copyLink = document.createElement("span");
//       copyLink.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
//     <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
// </svg>`;
//       copyLink.style.marginLeft = "10px";
//       copyLink.style.cursor = "pointer";
//       copyLink.style.textDecoration = "underline";

//       // Copy functionality
//       copyLink.addEventListener("click", function (event) {
//         event.preventDefault();
//         navigator.clipboard
//           .writeText(anchor.textContent ?? "")
//           .then(() => {
//             console.log("Copied: " + anchor.textContent);
//           })
//           .catch((err) => {
//             console.error("Failed to copy: ", err);
//           });
//       });

//       // Append the copy link after the anchor
//       anchor.parentNode?.appendChild(copyLink);
//     });
// });

const githubLoaded = async () => {
  console.log("github loaded");
  loadLockMerge();
  loadStatus();
};
waitFor(".timeline-comment-group").then(githubLoaded);

const pipelineLoaded = async () => {
  console.log("pipeline loaded");
  loadMessages();
};
waitFor("[class*='MergeBoxSectionHeader-module__wrapper']").then(
  pipelineLoaded
);
