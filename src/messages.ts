const loadActionsButton = () => {
  const messages = document.querySelector(
    ".partial-pull-merging-analytics-js section + div"
  );

  if (!messages) return;

  messages.classList.add("fs-messages");

  const message = document.createElement("a");
  message.href =
    "https://github.com/simplicate-software/frontend/actions?query=actor:joosthobmasimplicate";

  message.innerText = "Actions of this PR";

  messages.append(message);
};
export const loadMessages = () => {
  loadActionsButton();
};
