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

const loadActionsButton = () => {
  const { errors } = loadHTML();

  if (!errors) return;

  const message = document.createElement("a");
  message.href =
    "https://github.com/simplicate-software/frontend/actions?query=actor:joosthobmasimplicate";

  message.innerText = "Actions of this PR";

  errors.append(message);
};
export const loadMessages = () => {
  loadActionsButton();
};
