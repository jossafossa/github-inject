type bootstrapCopyTextProps = {
  url: string;
  selector: string;
  shortcut: (event: KeyboardEvent) => boolean;
  shortcutLabel: string;
  callback?: (element: HTMLElement) => string;
};

const copyText = (
  selector: string,
  callback: (element: HTMLElement) => string
) => {
  const element = document.querySelector(selector);
  if (element) {
    const text = callback(element as HTMLElement);
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.add("fs-copied");
      setTimeout(() => {
        el.classList.remove("fs-copied");
      }, 500);
    });

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log(`Copied: ${text}`);
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  } else {
    console.warn(`Element with selector "${selector}" not found.`);
  }
};

const setupCopy = ({
  url,
  selector,
  shortcut,
  shortcutLabel,
  callback = (element: HTMLElement) => element.innerText,
}: bootstrapCopyTextProps) => {
  if (!window.location.href.includes(url)) return;

  document.addEventListener("keydown", (event) => {
    if (shortcut(event)) {
      event.preventDefault();
      copyText(selector, callback);
    }
  });

  document.querySelectorAll(selector).forEach((e) => {
    (e as HTMLElement).dataset.shortcutLabel = shortcutLabel;
  });
};

export const loadShortcuts = () => {
  setupCopy({
    url: "github.com",
    selector: "#partial-discussion-header clipboard-copy",
    shortcut: (event) =>
      event.metaKey && event.shiftKey && event.code === "KeyA",
    shortcutLabel: "⌘⇧A",
    callback: (e) => e.getAttribute("value") ?? "",
  });
};
