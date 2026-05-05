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

// 1. Store the controller outside the function scope
let currentTimerController: AbortController | null = null;

export function run(minutes: number) {
  // 2. If a previous run exists, cancel it immediately
  if (currentTimerController) {
    currentTimerController.abort();
    setProgress(100);
  }

  // 3. Create a new controller for this specific run
  currentTimerController = new AbortController();
  const { signal } = currentTimerController;

  const timeEl: HTMLElement | null = document.querySelector("#time-display h1");
  let totalSeconds = minutes * 60;
  const decrementAmount = 100 / totalSeconds;
  let currentPercent = 100;

  const updateUI = (totalSecs: number) => {
    if (!timeEl) return;
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    timeEl.innerText = `${m}:${s.toString().padStart(2, "0")}`;
  };

  updateUI(totalSeconds);

  const interval = setInterval(() => {
    // 4. Check if this specific run was aborted
    if (signal.aborted) {
      clearInterval(interval);
      return;
    }

    totalSeconds--;
    currentPercent -= decrementAmount;

    if (totalSeconds <= 0) {
      updateUI(0);
      setProgress(0);
      setProgress(100);
      clearInterval(interval);
      return;
    }

    updateUI(totalSeconds);
    setProgress(currentPercent);
  }, 1000);

  // 5. Cleanup listener
  signal.addEventListener("abort", () => clearInterval(interval), {
    once: true,
  });
}
