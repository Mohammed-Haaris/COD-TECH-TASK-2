/** @format */
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage or initialize an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Make sure this is defined at the top

  // Render tasks on page load
  renderTasks();

  // Event listener for task actions (edit, delete)
  taskList.addEventListener("click", (e) => {
    const target = e.target;
    const listItem = target.closest("li");
    const id = Number(listItem.dataset.id);

    if (target.classList.contains("edit-btn")) {
      const taskContent = prompt(
        "Edit your task:",
        tasks.find((task) => task.id === id).content
      );
      if (taskContent !== null) {
        editTask(id, taskContent);
      }
    } else if (target.classList.contains("delete-btn")) {
      deleteTask(id);
    }
  });

  // Render tasks to the UI
  function renderTasks() {
    taskList.innerHTML = tasks
      .map(
        (task) => `
              <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${task.id}">
                  <input type="text" class="form-control task-content" value="${task.content}" readonly>
                  <span>
                      <button class="btn btn-warning btn-sm edit-btn m-2">✏ Edit</button>
                      <button class="btn btn-danger btn-sm delete-btn m-2">❌ Delete</button>
                  </span>
              </li>
          `
      )
      .join(""); // Convert array to string
  }

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Event listener to add a new task
  addTaskBtn.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();
    if (taskValue) {
      const newTask = { id: Date.now(), content: taskValue };
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      taskInput.value = ""; // Clear input field
    }
  });

  // Edit a task
  function editTask(id, newContent) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.content = newContent.trim();
      saveTasks();
      renderTasks();
    }
  }

  // Delete a task
  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }
});
