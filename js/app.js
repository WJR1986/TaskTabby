// Initialize alarm state (on by default)
let isAlarmOn = true;
const alarmSound = new Audio('alarm-sound.mp3');

document.addEventListener("DOMContentLoaded", function () {
    // Check for theme preference in local storage
    let isDarkMode = localStorage.getItem("darkMode");

    // If theme preference is not set, default to dark mode
    if (isDarkMode === null) {
        isDarkMode = true;
        localStorage.setItem("darkMode", isDarkMode.toString());
    } else {
        // Convert the stored string to a boolean
        isDarkMode = isDarkMode === "true";
    }

    // Check for existing tasks in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render existing tasks
    renderTasks(tasks);

    // Set the initial theme
    setTheme(isDarkMode);

    // Initialize the alarm icon based on the initial state
    updateAlarmIcon();
});

function toggleAlarm() {
    // Toggle the alarm state
    isAlarmOn = !isAlarmOn;

    // Update the alarm icon
    updateAlarmIcon();

    // If a timer is active, update the alarm state in the timer logic
    if (timerStarted) {
        if (!isAlarmOn) {
            stopAlarm();
        }
    }
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset the playback position
}

function playAlarm() {
    if (isAlarmOn) {
        alarmSound.play();
    }
}

function updateAlarmIcon() {
    // Get the alarm icon element
    const alarmIcon = document.getElementById('alarmIcon');

    // Update the icon based on the alarm state
    alarmIcon.className = isAlarmOn ? 'fas fa-bell' : 'fas fa-bell-slash';
}

function updateAlarmState() {
    // You can add logic here to update the alarm state in your timer logic
    // For example, if you're using the Pomodoro timer, you can pause or resume the alarm sound based on the alarm state.
    // This function should be customized based on how you want the alarm to behave during different timer states.
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const pomodorosInput = document.getElementById("pomodorosInput");

    const taskText = taskInput.value.trim();
    const pomodoros = parseInt(pomodorosInput.value, 10) || 0; // Default to 0 if not a valid number

    if (taskText === "") {
        // Show alert if task input is empty
        alert("Please enter a task before adding.");
        return; // Exit the function to prevent adding an empty task
    }

    // Create a task object with Pomodoros
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        pomodoros: pomodoros
    };

    // Get existing tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Add the new task to the array
    tasks.push(task);

    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Render the updated tasks
    renderTasks(tasks);

    // Clear the input fields
    taskInput.value = "";
    pomodorosInput.value = "";
}

function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");

    // Clear existing task list
    taskList.innerHTML = "";

    // Render tasks
    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task"; // Set the class for the task div
        taskItem.setAttribute("data-id", task.id);

        const listItem = document.createElement("li");
        listItem.className = "task-item d-flex flex-wrap align-items-center border border-dark rounded p-2"; // Allow items to wrap onto multiple lines
        listItem.setAttribute("data-completed", task.completed);

        const taskText = document.createElement("span");
        taskText.className = "task-text"; // Remove the fixed width
        taskText.textContent = `${task.text} (${task.pomodoros} Pomodoros)`;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "ml-2 mt-md-0";

        const completeButton = document.createElement("i");
        completeButton.className = "fa-regular fa-circle-check custom-icon m-2"; // Add custom class for styling
        completeButton.onclick = () => toggleCompletion(task.id);

        const removeButton = document.createElement("i");
        removeButton.className = "fa-solid fa-trash-can custom-icon"; // Add custom class for styling
        removeButton.onclick = () => removeTask(task.id);

        buttonContainer.appendChild(completeButton);
        buttonContainer.appendChild(removeButton);

        listItem.appendChild(taskText);
        listItem.appendChild(buttonContainer);

        taskItem.appendChild(listItem);

        taskList.appendChild(taskItem);
    });
}




function toggleCompletion(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find the task by ID
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        // Toggle the completion status
        tasks[taskIndex].completed = !tasks[taskIndex].completed;

        // Save the updated tasks array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Render the updated tasks
        renderTasks(tasks);
    }
}

function removeTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filter out the task to be removed
    const filteredTasks = tasks.filter(task => task.id !== id);

    // Save the updated tasks array to local storage
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));

    // Render the updated tasks
    renderTasks(filteredTasks);
}

function toggleTheme() {
    const isDarkMode = !document.body.classList.contains("dark-mode");

    // Toggle the dark mode class on the body element
    document.body.classList.toggle("dark-mode", isDarkMode);

    // Update the background image based on the theme
    const backgroundImage = isDarkMode ? 'images/bg-dark.jpg' : 'images/bg-light.jpg';
    document.body.style.backgroundImage = `url('${backgroundImage}')`;

    // Save the theme preference to local storage
    localStorage.setItem("darkMode", isDarkMode.toString());
}

function setTheme(isDarkMode) {
    document.body.classList.toggle("dark-mode", isDarkMode);
}

function toggleCollapsible() {
    var content = document.getElementById("collapsibleContent");
    var icon = document.getElementById("toggleIcon");

    if (content.style.display === "none" || content.style.display === "") {
        // If content is hidden, show it
        content.style.display = "block";
        icon.className = "fas fa-minus-circle fa-icon"; // Change the icon to the minus sign

        // If the YouTube player is not initialized, initialize it
        if (!player) {
            onYouTubeIframeAPIReady();
        }
    } else {
        // If content is visible, hide it
        content.style.display = "none";
        icon.className = "fas fa-plus-circle fa-icon"; // Change the icon to the plus sign

        // If the YouTube player is initialized, destroy it to stop the video and release resources
        if (player) {
            player.destroy();
            player = null; // Set player to null so that it can be reinitialized
        }
    }
}
