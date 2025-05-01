import { getBranch } from "./utils";

const loadHTML = () => {
  const container = document.querySelector(
    ".partial-pull-merging-analytics-js section + div"
  );

  if (!container) return {};

  const errors = document.createElement("div");
  container.prepend(errors);

  errors.classList.add("fs-errors");

  const messages = document.createElement("div");
  container.prepend(messages);

  messages.classList.add("fs-messages");

  return {
    errors,
    messages,
  };
};

const getMessage = (value: string) => {
  const message = document.createElement("span");
  message.classList.add("fs-message");
  message.innerHTML = value;

  return message;
};

const loadPipelineMessage = () => {
  const branch = getBranch();

  console.log({ branch });

  if (!branch) return;

  return getMessage(
    `<a href='https://github.com/simplicate-software/frontend/actions?query=branch:${branch}'>Actions of this PR</a>`
  );
};

const loadActionsButton = () => {
  const { messages } = loadHTML();

  if (!messages) return;

  const pipelineMessage = loadPipelineMessage();
  if (pipelineMessage) {
    messages.append(pipelineMessage);
  }
};
export const loadMessages = () => {
  loadActionsButton();
};
