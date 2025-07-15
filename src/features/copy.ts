const createCopyLink = (anchor: HTMLAnchorElement) => {
  // Create the copy link
  let copyLink = document.createElement("span");
  const copyIcon = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>`;
  const checkIcon = `<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy" style="display: none;">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
</svg>
`;
  copyLink.innerHTML = copyIcon;
  copyLink.style.marginLeft = "4px";
  copyLink.style.cursor = "pointer";
  copyLink.style.textDecoration = "underline";

  // Copy functionality
  copyLink.addEventListener("click", function (event) {
    event.preventDefault();
    navigator.clipboard
      .writeText(anchor.textContent ?? "")
      .then(() => {
        copyLink.textContent = checkIcon;
        setTimeout(() => {
          copyLink.innerHTML = copyIcon;
        }, 500);
        console.log("Copied: " + anchor.textContent);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  // Append the copy link after the anchor
  anchor.parentNode?.appendChild(copyLink);
};

export const loadCopy = () => {
  const summaryAnchors = document.querySelectorAll(
    "details-collapsible summary a"
  );
  summaryAnchors.forEach((element) =>
    createCopyLink(element as HTMLAnchorElement)
  );
  if (summaryAnchors.length === 0) {
    console.warn("No summary anchors found for copy links.");
  }

  const commitHashes = document.querySelectorAll(
    ".js-details-container .AvatarStack ~ div:nth-last-child(1) a[href*='/commits/']"
  );
  commitHashes.forEach((element) =>
    createCopyLink(element as HTMLAnchorElement)
  );
  if (commitHashes.length === 0) {
    console.warn("No commit hashes found for copy links.");
  }
};
