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

export function run() {
  // Example: Animate from 0 to 100% over 5 seconds
  let currentPercent = 100;
  const interval = setInterval(() => {
    if (currentPercent <= 0) {
      setProgress(0);
      clearInterval(interval);
    } else {
      currentPercent--;
      setProgress(currentPercent);
    }
  }, 50); // Updates every 50ms
}
