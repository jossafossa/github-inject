const LOCK_MERGE_STORAGE_KEY = "lock-merge";

export const loadLockMerge = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "lock-merge";

  document.body.appendChild(checkbox);

  if (localStorage.getItem(LOCK_MERGE_STORAGE_KEY) === "checked") {
    checkbox.checked = true;
  }

  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      LOCK_MERGE_STORAGE_KEY,
      checkbox.checked ? "checked" : "unchecked"
    );
  });
};
