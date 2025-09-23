// Select elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Add Task Event
addBtn.addEventListener("click", addTask);

// Allow "Enter" key to add task
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add Task Function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = taskText;

  // Create actions (Complete & Delete)
  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  // Append buttons to actions div
  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  // Append actions to li
  li.appendChild(actions);

  // Add li to task list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";

  // Event: Complete Task
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Event: Delete Task
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });
}
