// Stopwatch functionality
let startTime = 0,
    updatedTime = 0,
    difference = 0,
    tInterval = null;
let running = false;
let lapCount = 1;

const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Function to start the stopwatch
function start() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateTime, 10); // Updates every 10ms
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    running = true;
  }
}

// Function to pause the stopwatch
function pause() {
  clearInterval(tInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  running = false;
}

// Function to reset the stopwatch
function reset() {
  clearInterval(tInterval);
  running = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  difference = 0;
  lapCount = 1;
  lapList.innerHTML = '';
  timeDisplay.innerHTML = '00:00:00.000';
}

// Function to record a lap time
function recordLap() {
  if (running) {
    const lapTime = formatTime(difference);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
  }
}

// Function to update the time display
function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  timeDisplay.innerHTML = formatTime(difference);
}

// Function to format time in HH:MM:SS.MS format
function formatTime(d) {
  const hours = Math.floor(d / (1000 * 60 * 60));
  const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((d % (1000 * 60)) / 1000);
  const milliseconds = d % 1000;

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds.toString().padStart(3, '0')}`;
}

// Helper function to pad numbers with leading zero if needed
function pad(num) {
  return num < 10 ? '0' + num : num;
}

// Event Listeners
startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
