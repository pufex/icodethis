const progressbars = document.querySelectorAll('[role="progressbar"]')
const progressHeader = document.querySelector(".progress-header")

let progress = 75;
const setBars = () => {
    progressHeader.innerText = progress + "%";
    progressbars.forEach((bar, index) => {
        const fill = bar.querySelector(".fill");
        fill.style.width = `${progress.toFixed()}%`
        if (bar.querySelector(".progressbar-bubble"))
            bar.querySelector(".progressbar-bubble").innerText = progress + "%";
        if (bar.querySelector(".progress"))
            bar.querySelector(".progress").innerText = progress + "%";
    })
}

setBars();

const threeBarsSimulation = (intervals, rate) => {
    // rate has to be a factor of 100
    // So it must be a part of the following array
    let factors = [1, 2, 4, 5, 10, 20, 25, 50, 100]
    let chosenRate = rate;
    if (!factors.includes(chosenRate)) chosenRate = factors[Math.floor(Math.random() * factors.length)];
    progress = 0;
    let intervalId;
    intervalId = setInterval(() => {
        progress += chosenRate;
        setBars();
        if (progress >= 100)
            clearInterval(intervalId);    
    }, intervals)
}

const btnForThree = document.querySelector(".three");
btnForThree.addEventListener("click", () => {
    threeBarsSimulation(500, 5)
})


const finalBar = document.querySelector('[role="progressbar-goals"]')
const finalBarFill = finalBar.querySelector(".fill")
const finalBarRect = finalBar.getBoundingClientRect();

const setFinalBar = () => {
    finalBarFill.style.width = `${progress.toFixed(0)}%`;
    progressHeader.innerText = progress + "%";
    const finalBarGoals = finalBar.querySelectorAll(".goal");
    finalBarGoals.forEach((goal) => {
        const goalRect = goal.getBoundingClientRect();
        let leftEdgeXpercentOfWidth = (goalRect.x - finalBarRect.x)/finalBarRect.width * 100
        let rightEdgeXpercentOfWidth = (goalRect.x - finalBarRect.x + goalRect.width) / finalBarRect.width * 100;
        if (progress < leftEdgeXpercentOfWidth) {
            goal.classList.add("inactive")
            if (goal.classList.contains("current"))
                goal.classList.remove("current")
            if (goal.classList.contains("active"))
                goal.classList.remove("active")
        }
        else if (progress >= leftEdgeXpercentOfWidth && progress <= rightEdgeXpercentOfWidth) {
            goal.classList.add("current")
            if (goal.classList.contains("inactive"))
                goal.classList.remove("inactive")
            if (goal.classList.contains("active"))
                goal.classList.remove("active")
            
        }
        else if (progress > rightEdgeXpercentOfWidth) {
            goal.classList.add("active");
            if (goal.classList.contains("current"))
                goal.classList.remove("current")
            if (goal.classList.contains("inactive"))
                goal.classList.remove("inactive")
        }
    
    })
}

setFinalBar();

const simulateFinalBar = (rate, interval, begin) => {

    let chosenRate = rate;
    progress = begin;

    let intervalId;
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        progress += chosenRate;
        setFinalBar();
        if (progress >= 100)
            clearInterval(intervalId);    
    }, interval)
}

const finalButton = document.querySelector(".final")
finalButton.addEventListener("click", () => {
    simulateFinalBar(0.25, 500, 60);
})

