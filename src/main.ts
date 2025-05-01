import { loadCopy } from "./copy";
import { loadLockMerge } from "./lockMerge";
import { loadMessages } from "./messages";
import { loadStatus } from "./status";
import styles from "./styles.scss?raw";
import { waitFor } from "./utils";

// insert a style
const style = document.createElement("style");
style.innerHTML = styles;
document.head.appendChild(style);

const githubLoaded = async () => {
  console.log("github loaded");
  loadLockMerge();
  loadStatus();
  loadCopy();
};
waitFor(".timeline-comment-group").then(githubLoaded);

const pipelineLoaded = async () => {
  console.log("pipeline loaded");
  loadMessages();
};
waitFor("[class*='MergeBoxSectionHeader-module__wrapper']").then(
  pipelineLoaded
);
