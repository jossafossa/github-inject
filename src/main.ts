import { loadCopy } from "./copy";
import { loadLockMerge } from "./lockMerge";
import { loadMessages } from "./messages";
import { loadStatus } from "./status";
import "./styles.scss";
import { waitFor, log } from "./utils";

// // insert a style
// const style = document.createElement("style");
// style.innerHTML = styles;
// document.head.appendChild(style);

const githubLoaded = async () => {
  log("github loaded");
  loadLockMerge();
  loadStatus();
  loadCopy();
};
waitFor(".timeline-comment-group").then(githubLoaded);

const pipelineLoaded = async () => {
  log("pipeline loaded");
  loadMessages();
};
waitFor("[class*='MergeBoxSectionHeader-module__wrapper']").then(
  pipelineLoaded
);
