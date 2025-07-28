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
    // Show hours if there are any, or if there are days (for consistency)
    result += `${hours}h `;
  }
  result += `${minutes}m ${seconds}s`;

  return result.trim(); // Trim any trailing space if days/hours are not present
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

  console.log({ labels, seconds, secondsLabel });
};
