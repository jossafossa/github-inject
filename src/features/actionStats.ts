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

export const actionStats = () => {
  const actions = document.querySelector("#partial-actions-workflow-runs");
  if (!actions) {
    return;
  }

  const labels = [
    ...actions.querySelectorAll(
      ".Box-row > * > .d-table-cell:last-child .issue-keyword"
    ),
  ].map((e) => e.textContent as string);

  const seconds = labels.map(convertToSeconds);

  console.log({ labels, seconds });
};
