function showTab(tabName) {
  const tabs = document.getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.classList.remove("active");
  }

  const contents = document.getElementsByClassName("content");
  for (const content of contents) {
    content.style.display = "none";
  }

  document.getElementById(tabName + "Content").style.display = "flex";
  document
    .querySelector('.tab[data-tab="' + tabName + '"]')
    .classList.add("active");
}

// Create day elements
const numbersContent = document.getElementById("numbersContent");
for (let i = 1; i <= 31; i++) {
  const numberContainer = document.createElement("div");
  numberContainer.className = "number-container";
  numbersContent.appendChild(numberContainer);

  const numberDiv = document.createElement("div");
  numberDiv.className = "number-content boxborder";
  numberDiv.textContent = i;
  numberContainer.appendChild(numberDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = "Ready";
  numberContainer.appendChild(bottomDiv);
}

// Create month elements
const monthsContent = document.getElementById("monthsContent");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
for (const month of months) {
  const monthContainer = document.createElement("div");
  monthContainer.className = "number-container";
  monthsContent.appendChild(monthContainer);

  const monthDiv = document.createElement("div");
  monthDiv.className = "months-content boxborder";
  monthDiv.textContent = month;
  monthContainer.appendChild(monthDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = "Ready";
  monthContainer.appendChild(bottomDiv);
}

// Create season elements
const seasonsContent = document.getElementById("seasonsContent");
const seasons = [
  "Winter",
  "Spring",
  "Summer",
  "Autumn",
];
const Smonts = {
  "Winter": "December → Febuary",
  "Spring": "March → May",
  "Summer": "June → August",
  "Autumn": "September → November"
};
for (const season of seasons) {
  const seasonContainer = document.createElement("div");
  seasonContainer.className = "number-container";
  seasonsContent.appendChild(seasonContainer);

  const seasonDiv = document.createElement("div");
  seasonDiv.className = "seasons-content boxborder";
  seasonDiv.textContent = season;

  const seasonMonthDiv = document.createElement("div");
  seasonMonthDiv.className = "seasonMonth";
  seasonMonthDiv.textContent = Smonts[season];

  seasonDiv.appendChild(seasonMonthDiv);
  seasonContainer.appendChild(seasonDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = "Ready";
  seasonContainer.appendChild(bottomDiv);
}

// Add index id to each container to simplify updating the state
const numberContainers = document.querySelectorAll(".number-container");
numberContainers.forEach((container, index) => {
  container.id = `container-${index}`;
  container.addEventListener('click', handleClick);
});

// Keep the state of each tile
const timers = Array(numberContainers.length).fill(0);

// Update all the timers every second
// This is better than doing an interval for each timer, because they might run out of sequence which can cause drift
// Timers might also be delayed if the event loop can't run it in time, by using the timestamp this is not a problem.
setInterval(() => {
  const time = new Date() / 1000;
  for (let i = 0; i < timers.length; i++) {
    const container = numberContainers[i];
    const bottomElement = container.querySelector(".bottom");
    const backgroundEl = container.querySelector(".boxborder");
    
    if (timers[i] > time) {
      // If not ready, display the current timer
      const remaining = timers[i] - time;
      const minutes = Math.floor(remaining / 60);
      const seconds = Math.floor(remaining % 60);
  
      bottomElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      container.removeEventListener('click', handleClick);
    } else if (bottomElement.innerText !== "Ready") {
      // Otherwise, remove the styles and display "Ready"
      bottomElement.innerText = "Ready";
      removeInlineStyles(bottomElement);
      removeInlineStyles(backgroundEl);
      container.addEventListener('click', handleClick);
    }
  }
}, 1000);

// Function to handle the countdown logic
function startCountdown(container) {
  // Adding the styles to disable the click and show the timer
  const bottomElement = container.querySelector(".bottom");
  const backgroundEl = container.querySelector(".boxborder");
  bottomElement.style.backgroundColor = "grey";
  backgroundEl.style.backgroundColor = "grey";
  backgroundEl.style.color = "#939393";
  // Update the timer expiration to 5 minutes from now, this will be handled by the setInterval handler above
  timers[container.id.split("-")[1]] = new Date() / 1000 + 60 * 5;
}

function removeInlineStyles(element) {
  element.removeAttribute("style");
}

function handleClick() {
  startCountdown(this);
}
