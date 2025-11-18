<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My To-Do List (jQuery)</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <style>
    body {
      background: #f5f5f5;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 400px;
      background: white;
      padding: 20px;
      margin: 80px auto;
      border-radius: 12px;
      
    }
    input[type=text] {
      width: 70%;
      padding: 8px;
      margin-right: 10px;
    }
    button {
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      color: white;
    }
    .add-btn { background: #28a745; }
    .toggle-btn { background: #0d6efd; margin-top: 10px; }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      background: #eee;
      margin: 5px 0;
      padding: 6px 10px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>My To-Do List</h2>
    <input type="text" id="taskInput" placeholder="Enter task...">
    <button class="add-btn" id="addBtn">Add</button><br>
    <button class="toggle-btn" id="toggleBtn">Hide List</button>

    <ul id="todoList"></ul>
  </div>

  <script>
    $(document).ready(function() {
      $("#addBtn").click(function() {
        let task = $("#taskInput").val();
        if (task !== "") {
          $("#todoList").append(
            `<li>${task} <button style="background:#dc3545">X</button></li>`
          );
          $("#taskInput").val("");
        }
      });

      $("#todoList").on("click", "button", function() {
        $(this).parent().remove();
      });

      $("#toggleBtn").click(function() {
        $("#todoList").toggle();
        $(this).text($(this).text() === "Hide List" ? "Show List" : "Hide List");
      });
    });
  </script>
</body>
</html>
