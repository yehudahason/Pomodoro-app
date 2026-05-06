import { handleRestart } from "../components/Timer";
// 1. Store the controller outside the function scope
let currentTimerController: AbortController | null = null;
let currentRemainingSeconds: number = 0;
let currentPercent: number = 100;
let isPaused: boolean = false;
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
let updateUI = (totalSecs: number) => {
  let timeEl: HTMLElement | null = document.querySelector("#time-display h1");
  if (!timeEl) return;
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  timeEl.innerText = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
export function pause() {
  if (currentTimerController) {
    currentTimerController.abort(); // Stops the interval via the signal
    isPaused = true;
    // We don't reset currentRemainingSeconds here; we keep them for resuming
  }
}

export function start(minutes: number) {
  // 1. If a previous run exists, cancel it
  if (currentTimerController) {
    currentTimerController.abort();
  }

  currentTimerController = new AbortController();
  const { signal } = currentTimerController;

  // 2. Logic to Resume or Start Fresh
  if (!isPaused) {
    currentRemainingSeconds = minutes * 60;
    currentPercent = 100;
  }
  isPaused = false; // Reset pause flag now that we are starting

  const totalDuration = minutes * 60;
  const decrementAmount = 100 / totalDuration;

  updateUI(currentRemainingSeconds);

  const interval = setInterval(() => {
    if (signal.aborted) {
      clearInterval(interval);
      return;
    }

    currentRemainingSeconds--;
    currentPercent -= decrementAmount;

    if (currentRemainingSeconds <= 0) {
      updateUI(0);
      setProgress(100);
      clearInterval(interval);
      handleRestart();
      return;
    }

    updateUI(currentRemainingSeconds);
    setProgress(currentPercent);
  }, 1000);

  signal.addEventListener("abort", () => clearInterval(interval), {
    once: true,
  });
}

// Ensure stop resets the pause state completely
export function stop() {
  currentTimerController?.abort();
  isPaused = false;
  currentRemainingSeconds = 0;
  currentPercent = 100;
  setProgress(100);
}

export function setStart(minutes: number) {
  updateUI(minutes * 60);
  setProgress(100);
}
