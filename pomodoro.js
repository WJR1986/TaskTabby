const imageElement = document.querySelector(".image-section img");
let remainingTimeOnPause = 0; // Variable to store remaining time when paused

let timerInterval;
let minutes;
let seconds;
let isPaused = false;
let timerStarted = false;
let currentTimerType;
// Array to store preloaded Image objects
const preloadedImages = [];

// Preload images
const imageSources = ["pomodoro-still.jpg", "pomodoro-running.gif", "short-still.jpg", "short-running.gif", "long-still.jpg", "long-running.gif", "cat-relaxing.gif"];
imageSources.forEach(src => {
    const tempImage = new Image();
    tempImage.src = src;
    preloadedImages.push(tempImage);
});

function setImage(src) {
    if (imageElement) {
        imageElement.src = src;
        console.log("Image loaded. Updating source.");
    }
}

function updateImageSource(src) {
    // Update the source
    imageElement.src = src;

    // Additional logic if needed
    console.log("Image loaded. Updating source.");
}

function preloadImage(timerType) {
    const tempImage = new Image();
    tempImage.onload = function () {
        // Once the image is loaded, update the source and start the timer
        setImage(tempImage.src);
    };

    // Set the source based on the timer type
    if (timerType === "pomodoro") {
        tempImage.src = "pomodoro-running.gif"; // Image for running
    } else if (timerType === "shortBreak") {
        tempImage.src = "short-running.gif"; // Image for running
    } else if (timerType === "longBreak") {
        tempImage.src = "long-running.gif"; // Image for running
    } else if (timerType === "testBreak") {
        tempImage.src = "cat-relaxing.gif"; // Image for running
    }
}

function startTimer(duration, timerType) {
    // Check if a timer is already running
    if (timerStarted) {
        // If a timer is running, pause it and start a new one
        pauseTimer();
    }

    // Clear any existing interval to avoid multiple intervals running simultaneously
    clearInterval(timerInterval);

    // Set the initial time display
    setTimer(duration);

    // Set the current timer type
    currentTimerType = timerType;

    // Preload the image
    preloadImage(currentTimerType);

    // If there is remaining time from the previous pause, use it
    if (remainingTimeOnPause > 0) {
        setTimer(remainingTimeOnPause);
        remainingTimeOnPause = 0;
    } else {
        // If there is no remaining time on pause, set the timer using the provided duration
        setTimer(duration);
    }

    // Start the interval
    timerInterval = setInterval(function () {
        if (!isPaused) {
            timerStarted = true;
            if (minutes === 0 && seconds === 0) {
                // Timer completed, update the image to pomodoro-still.jpg
                setImage("pomodoro-still.jpg");

                // Play the alarm sound
                playAlarm();

                // Pause the timer and reset it
                clearInterval(timerInterval);
                setTimer(duration);
                updateTimerDisplay();

                timerStarted = false;
                document.getElementById("pauseButton").style.display = "none";
            } else {
                // Decrement the timer
                decrementTimer();
                updateTimerDisplay();
            }
        } else {
            // Timer is paused, update the image based on the timer type
            setImage(getPausedImageSource(currentTimerType));
            remainingTimeOnPause = minutes * 60 + seconds; // Store remaining time
        }
    }, 1000);

    // Show the "Pause" button
    document.getElementById("pauseButton").style.display = "inline-block";
}


function getImageSource(timerType) {
    if (timerType === "pomodoro") {
        return "pomodoro-running.gif"; // Image for running
    } else if (timerType === "shortBreak") {
        return "short-running.gif"; // Image for running
    } else if (timerType === "longBreak") {
        return "long-running.gif"; // Image for running
    } else if (timerType === "testBreak") {
        return "cat-relaxing.gif"; // Image for running
    }

    // Default to pomodoro-running.gif if no match
    return "pomodoro-running.gif";
}

function pauseTimer() {
    isPaused = !isPaused;

    // Update the image immediately based on the current timer state
    if (isPaused) {
        setImage(getPausedImageSource(currentTimerType));

        // If the timer is paused, clear the interval to prevent further countdown
        clearInterval(timerInterval);
    } else if (timerStarted) {
        // Timer is running and not paused, update the image based on the timer type
        setImage(getImageSource(currentTimerType));

        // If the timer is resumed, start a new interval
        timerInterval = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                // Timer completed, update the image to pomodoro-still.jpg
                setImage("pomodoro-still.jpg");

                // Play the alarm sound
                playAlarm();

                // Pause the timer and reset it
                clearInterval(timerInterval);
                setTimer(duration);
                updateTimerDisplay();

                timerStarted = false;
                document.getElementById("pauseButton").style.display = "none";
            } else {
                // Decrement the timer
                decrementTimer();
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function getPausedImageSource(timerType) {
    // Return the appropriate image source when the timer is paused
    if (timerType === "pomodoro") {
        return "pomodoro-still.jpg"; // Image when Pomodoro is paused
    } 
    else if (timerType === "longBreak") {
        return "long-still.jpg";
    }
    else if (timerType === "shortBreak") {
        return "short-still.jpg";
    }
    else {
        return "cat-relaxing.jpg"; // Image when Short Break, Long Break, or Test Break is paused
    }
}

function decrementTimer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    }
}

function updateTimerDisplay() {
    document.getElementById("minutes").innerText = padZero(minutes);
    document.getElementById("seconds").innerText = padZero(seconds);
}

function setTimer(duration) {
    // Set the total time in seconds
    const totalTimeInSeconds = duration * 60;

    // Split the total time into minutes and seconds
    minutes = Math.floor(totalTimeInSeconds / 60);
    seconds = totalTimeInSeconds % 60;

    // Update the timer display
    updateTimerDisplay();
}

function stopTimer() {
    clearInterval(timerInterval);
    timerStarted = false;
    isPaused = false;
    remainingTimeOnPause = 0; // Reset remaining time on pause

    // Reset the image to pomodoro-running.gif
    setImage("pomodoro-running.gif");

    // Hide the "Pause" button
    document.getElementById("pauseButton").style.display = "none";
}

function padZero(value) {
    return value < 10 ? "0" + value : value;
}

function handleButtonClick(duration, timerType) {
    // Check if a timer is already running
    if (timerStarted) {
        // If a timer is running, stop it and start a new one
        stopTimer();
    }

    // Start a new timer
    startTimer(duration, timerType);
}

// Modify your button click handlers like this:
// Example for Pomodoro button
document.querySelector(".btn-success").addEventListener("click", function () {
    handleButtonClick(25, "pomodoro");
});

// Example for Short Break button
document.querySelector(".btn-warning").addEventListener("click", function () {
    handleButtonClick(5, "shortBreak");
});

// Example for Long Break button
document.querySelector(".btn-info.longBreak").addEventListener("click", function () {
    handleButtonClick(15, "longBreak");
});

// Example for Test Break button
// document.querySelector(".btn-info.testBreak").addEventListener("click", function () {
//     handleButtonClick(1, "testBreak");
// });