const getStatus = () => {
  if (document.querySelector(".gh-header-meta [title='Status: Merged']"))
    return "merged";
  if (document.querySelector("[reviewable_state='draft']")) return "draft";
  if (document.querySelector("[data-name*='QA-Test'], [data-name*='qa-test']"))
    return "test";
  return false;
};

export const loadStatus = () => {
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
  }, 1000);
};
