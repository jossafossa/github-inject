function convertToSeconds(timeString: string) {
  const parts = timeString.split(" ");
  if (parts.length !== 2) {
    return -1;
  }

  const minutesStr = parts[0];
  const secondsStr = parts[1];

  if (!minutesStr.endsWith("m") || !secondsStr.endsWith("s")) {
    return -1;
  }

  const minutes = parseInt(minutesStr.slice(0, -1));
  const seconds = parseInt(secondsStr.slice(0, -1));

  if (isNaN(minutes) || isNaN(seconds) || minutes < 0 || seconds < 0) {
    return -1;
  }

  return minutes * 60 + seconds;
}

function convertFromSeconds(totalSeconds: number) {
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;

  const days = Math.floor(totalSeconds / secondsInDay);
  let remainingSeconds = totalSeconds % secondsInDay;

  const hours = Math.floor(remainingSeconds / secondsInHour);
  remainingSeconds %= secondsInHour;

  const minutes = Math.floor(remainingSeconds / secondsInMinute);
  const seconds = remainingSeconds % secondsInMinute;

  let result = "";
  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours}h `;
  }
  result += `${minutes}m ${seconds}s`;

  return result.trim();
}

export const actionStats = () => {
  const actions = document.querySelector("#partial-actions-workflow-runs");
  if (!actions) {
    return;
  }

  const labels = [
    ...actions.querySelectorAll(
      ".Box-row > * > .d-table-cell:last-child .issue-keyword"
    ),
  ].map((e) => (e as HTMLElement).innerText as string);

  const seconds = labels
    .map(convertToSeconds)
    .reduce((acc, cur) => acc + cur, 0);

  const secondsLabel = convertFromSeconds(seconds);

  document
    .querySelector(".paginate-container")
    ?.previousElementSibling?.insertAdjacentHTML(
      "afterend",
      `<summary class="color-fg-muted pr-2 pr-md-0" aria-haspopup="menu" role="button">
        <svg aria-label="Run duration" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-stopwatch">
    <path d="M5.75.75A.75.75 0 0 1 6.5 0h3a.75.75 0 0 1 0 1.5h-.75v1l-.001.041a6.724 6.724 0 0 1 3.464 1.435l.007-.006.75-.75a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734l-.75.75-.006.007a6.75 6.75 0 1 1-10.548 0L2.72 5.03l-.75-.75a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018l.75.75.007.006A6.72 6.72 0 0 1 7.25 2.541V1.5H6.5a.75.75 0 0 1-.75-.75ZM8 14.5a5.25 5.25 0 1 0-.001-10.501A5.25 5.25 0 0 0 8 14.5Zm.389-6.7 1.33-1.33a.75.75 0 1 1 1.061 1.06L9.45 8.861A1.503 1.503 0 0 1 8 10.75a1.499 1.499 0 1 1 .389-2.95Z"></path>
</svg>
        <span class="issue-keyword">
          ${secondsLabel}
        </span>
      </summary>`
    );

  console.log({ labels, seconds, secondsLabel });
};
