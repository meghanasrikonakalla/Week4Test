loadTasks();
function getTasksFromStorage() {
    let tasks = localStorage.getItem("taskList");
    return tasks ? JSON.parse(tasks) : [];
}
function saveTasks(tasks) {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}
function addTask() {

    let taskInput = document.getElementById("task-input");
    let taskValue = taskInput.value.trim();

    if(taskValue === ""){
        alert("Please enter a task");
        return;
    }
    let tasks = getTasksFromStorage();

    tasks.push(taskValue);

    saveTasks(tasks);

    taskInput.value = "";

    loadTasks();
}
function loadTasks() {
    let tasks = getTasksFromStorage();
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <div class="task-item">
            <span>${task}</span>
            <div class="task-buttons">
                <button class="update-btn" onclick="updateTask(${index})">Update</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        </div>
        `;
    });
}
function deleteTask(index) {
    let tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}
function updateTask(index) {
    let tasks = getTasksFromStorage();
    let updatedTask = prompt("Update your task", tasks[index]);
    if(updatedTask !== null && updatedTask.trim() !== ""){
        tasks[index] = updatedTask;
        saveTasks(tasks);
        loadTasks();
    }
}
