type bootstrapCopyTextProps = {
  url: string;
  selector: string;
  shortcut: (event: KeyboardEvent) => boolean;
  callback?: (element: HTMLElement) => string;
};

function bootstrapCopyText({
  url,
  selector,
  shortcut,
  callback = (element: HTMLElement) => element.innerText,
}: bootstrapCopyTextProps) {
  if (!window.location.href.includes(url)) return;

  // Function to copy text from the specified selector
  function copyText() {
    const element = document.querySelector(selector);
    if (element) {
      const text = callback(element as HTMLElement);
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
  }

  // Add event listener for Ctrl + Shift + A
  document.addEventListener("keydown", (event) => {
    if (shortcut(event)) {
      event.preventDefault();
      copyText();
    }
  });

  document.querySelectorAll(selector).forEach((e) => {
    e.classList.add("fs-can-copy");
  });
}

bootstrapCopyText({
  url: "github.com",
  selector: "clipboard-copy",
  shortcut: (event) => event.metaKey && event.shiftKey && event.code === "KeyA",
  callback: (e) => e.getAttribute("value") ?? "",
});
