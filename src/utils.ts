export const waitFor = async (selector: string) =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100);
  });

export const log = (...args: unknown[]) => {
  console.log(
    "%c[github-extensions]%c",
    "color: #f0db4f; font-weight: bold; background: #323330; padding: 2px 5px; border-radius: 3px;",
    "color: #fff; font-weight: normal; background: #323330; padding: 2px 5px; border-radius: 3px;",
    ...args
  );
};
