export function debounce(callback, time) {
  let intervalId = localStorage.getItem("debounceTimer");

  if (intervalId) {
    clearTimeout(intervalId);
  }

  intervalId = setTimeout(() => {
    callback();
  }, time);

  localStorage.setItem("debounceTimer", intervalId);
}
