$(document).ready(function () {
  
  loadTasks();

  // Add Task
  $("#addBtn").click(function () {
    let task = $("#taskInput").val().trim();
    if (task !== "") {
      addTask(task);
      $("#taskInput").val("");
    }
  });

  // Add task to local storage
  function addTask(text) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  // Load tasks to UI
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    $("#taskList").empty();

    tasks.forEach((task, index) => {
      $("#taskList").append(`
        <li>
          <span class="task-text">${task}</span>
          <div>
            <button class="btn edit" data-index="${index}">Edit</button>
            <button class="btn delete" data-index="${index}">Delete</button>
          </div>
        </li>
      `);
    });
  }

  // Delete Task
  $(document).on("click", ".delete", function () {
    let index = $(this).data("index");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  });

  // Edit Task
  $(document).on("click", ".edit", function () {
    let index = $(this).data("index");
    let li = $(this).closest("li");
    let currentText = li.find(".task-text").text();

    li.html(`
      <input type="text" class="edit-input" value="${currentText}" />
      <div>
        <button class="btn save" data-index="${index}">Save</button>
        <button class="btn cancel">Cancel</button>
      </div>
    `);
  });

  // Save updated task
  $(document).on("click", ".save", function () {
    let index = $(this).data("index");
    let updatedText = $(this).closest("li").find(".edit-input").val().trim();

    if (updatedText !== "") {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks[index] = updatedText;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    loadTasks();
  });

  // Cancel Edit
  $(document).on("click", ".cancel", function () {
    loadTasks();
  });

});
