import {
  loadCopy,
  loadLockMerge,
  loadMessages,
  loadShortcuts,
  loadStatus,
} from "./features";
import { log, waitFor } from "./utils";
import styles from "./assets/index.scss?inline";
import { actionStats } from "./features/actionStats";

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
waitFor("[class*='MergeBoxSectionHeader-module__wrapper']").then(() => {
  pipelineLoaded();
});

const actionLoaded = () => {
  log("action loaded");
  actionStats();
};
waitFor("#partial-actions-workflow-runs").then(actionLoaded);
