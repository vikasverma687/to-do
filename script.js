const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create list item
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    todoList.appendChild(li);

    saveTask(taskText);

    todoInput.value = "";
}

function deleteTask(button) {
    const li = button.parentElement;
    const taskText = li.querySelector(".task-text").textContent.trim();
    todoList.removeChild(li);

    removeTask(taskText);
    loadTasks();
}

function editTask(button) {
    const li = button.parentElement;
    const taskText = li.querySelector(".task-text");
    const currentText = taskText.textContent;

    // Prompt user for new text
    const newText = prompt("Edit Task:", currentText);
    if (newText === null || newText.trim() === "") return;

    // Update the text in the UI and local storage
    taskText.textContent = newText.trim();
    updateTask(currentText, newText.trim());
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    // Clear the list before adding items (in case of reloading)
    todoList.innerHTML = "";

    if (tasks.length === 0) {
        // Display message if there are no tasks
        const li = document.createElement("li");
        li.textContent = "No items to display";
        li.classList.add("empty-message");
        todoList.appendChild(li);
    } else {
        // Display all tasks if there are any
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text">${task}</span>
                <button class="edit-btn" onclick="editTask(this)">Edit</button>
                <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
}


function removeTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskToDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.indexOf(oldText);
    if (taskIndex > -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
