// ✅ Update Digital Clock
function updateDigitalTime() {
  const now = new Date();
  let hr = now.getHours();
  let min = String(now.getMinutes()).padStart(2, '0');
  let sec = String(now.getSeconds()).padStart(2, '0');
  let ampm = "AM";

  if (hr >= 12) {
    ampm = "PM";
    if (hr > 12) hr -= 12;
  }
  if (hr === 0) hr = 12;

  hr = String(hr).padStart(2, '0');
  document.getElementById('digital-time').textContent = `${hr}:${min}:${sec} ${ampm}`;
}

// ⏱ Stopwatch
let stopwatchInterval;
let elapsed = 0;

function updateStopwatch() {
  let hours = String(Math.floor(elapsed / 360000)).padStart(2, '0');
  let minutes = String(Math.floor((elapsed / 6000) % 60)).padStart(2, '0');
  let seconds = String(Math.floor((elapsed / 100) % 60)).padStart(2, '0');
  let ms = String(elapsed % 100).padStart(2, '0');
  document.getElementById('stopwatch').textContent = `${hours}:${minutes}:${seconds}.${ms}`;
}

// 🔔 Show feedback message
function showMessage(text, type) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = type;
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3000);
}

function startStopwatch() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      elapsed++;
      updateStopwatch();
    }, 10);
    showMessage("Stopwatch started!", "message-success");
  }
}

function stopStopwatch() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    showMessage("Stopwatch stopped!", "message-error");
  }
}

function resetStopwatch() {
  stopStopwatch();
  elapsed = 0;
  updateStopwatch();
  showMessage("Your time has been reset successfully!", "message-info");
}

// ⏲ Start Digital Clock
setInterval(updateDigitalTime, 1000);
updateDigitalTime();
