/**
 * Sets the timer progress based on percentage (0 to 100)
 * @param {number} percent - The progress percentage
 */
function setProgress(percent: number) {
  const circle: SVGCircleElement | null = document.querySelector(".progress");
  const radius: number | undefined = circle?.r.baseVal.value;
  if (!radius) return;
  const circumference = 2 * Math.PI * radius;
  console.log(Math.PI);

  // Calculate the offset:
  // 100% progress = 0 offset
  // 0% progress = full circumference offset
  const offset = circumference - (percent / 100) * circumference;
  if (!circle) return;
  circle.style.strokeDashoffset = String(offset);
}

export function run(minutes: number) {
  const timeEl: HTMLElement | null = document.querySelector("#time-display h1");

  // 1. Calculate total seconds immediately
  let totalSeconds = minutes * 60;
  const decrementAmount = 100 / totalSeconds;
  let currentPercent = 100;

  // Function to update the UI
  const updateUI = (totalSecs: number) => {
    if (!timeEl) return;
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    timeEl.innerText = `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Initial display call
  updateUI(totalSeconds);

  const interval = setInterval(() => {
    totalSeconds--;
    currentPercent -= decrementAmount;

    if (totalSeconds <= 0) {
      updateUI(0);
      setProgress(0);
      clearInterval(interval);
      return;
    }

    updateUI(totalSeconds);
    setProgress(currentPercent);
  }, 1000);
}
