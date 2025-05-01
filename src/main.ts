import {
  loadCopy,
  loadLockMerge,
  loadMessages,
  loadShortcuts,
  loadStatus,
} from "./features";
import { log, waitFor } from "./utils";
import styles from "./assets/index.scss?inline";

// insert a style
const style = document.createElement("style");
style.innerHTML = styles;
document.head.appendChild(style);

const githubLoaded = async () => {
  log("github loaded");
  loadLockMerge();
  loadStatus();
  loadCopy();
  loadShortcuts();
};
waitFor(".timeline-comment-group").then(githubLoaded);

const pipelineLoaded = async () => {
  log("pipeline loaded");
  loadMessages();
};
waitFor("[class*='MergeBoxSectionHeader-module__wrapper']").then(
  pipelineLoaded
);

GM_registerMenuCommand(
  "Log",
  function (event: MouseEvent | KeyboardEvent) {
    console.log("Menu item selected", { event });
  },
  "l"
);
