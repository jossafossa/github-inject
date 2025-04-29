import styles from "./styles.scss?raw";

const getStatus = () => {
  if (document.querySelector(".gh-header-meta [title='Status: Merged']"))
    return "merged";
  if (document.querySelector("[reviewable_state='draft']")) return "draft";
  if (document.querySelector("[data-name*='QA-Test'], [data-name*='qa-test']"))
    return "test";
  return false;
};

let updated = false;
const interval = setInterval(() => {
  const status = getStatus();
  if (updated !== status && status) {
    const statusLabel = `[${status.toUpperCase()}]`;
    updated = !!status;
    const title = document.querySelector("h1 > bdi");
    if (title) title.innerHTML = `${statusLabel} ${title.innerHTML}`;

    document.title = `${statusLabel} ${document.title}`;
    clearInterval(interval);
  }
}, 100);

// make merge button lockable
function initializeCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "lock-merge";

  document.body.appendChild(checkbox);

  const storedValue = localStorage.getItem("checkboxState");

  if (storedValue === "checked") {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      "checkboxState",
      checkbox.checked ? "checked" : "unchecked"
    );
  });
}

document.addEventListener("click", () => {
  if (document.querySelector("#lock-merge")) return;
  initializeCheckbox();
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll("details-collapsible summary a")
    .forEach((anchor) => {
      // Create the copy link
      let copyLink = document.createElement("span");
      copyLink.innerHTML = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`;
      copyLink.style.marginLeft = "10px";
      copyLink.style.cursor = "pointer";
      copyLink.style.textDecoration = "underline";

      // Copy functionality
      copyLink.addEventListener("click", function (event) {
        event.preventDefault();
        navigator.clipboard
          .writeText(anchor.textContent ?? "")
          .then(() => {
            console.log("Copied: " + anchor.textContent);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
          });
      });

      // Append the copy link after the anchor
      anchor.parentNode?.appendChild(copyLink);
    });
});

// insert a style
const style = document.createElement("style");
style.innerHTML = styles;
document.head.appendChild(style);

setTimeout(() => {
  const iframe = document.createElement("iframe");

  iframe.src =
    "https://github.com/simplicate-software/frontend/actions?query=actor:joosthobmasimplicate";

  document.body.append(iframe);
});
