let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

renderTodoList();
updateAddButtonState();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const name = todoObject.name;
    const duedate = todoObject.duedate;

    const html = `<div class="todo-flex">
    <p>${name}</p>  <p>${duedate}</p>
    <button class="delete-button js-delete-button">Delete</button>
    </div>`;
    todoListHTML += html;
  });

  if (todoList.length > 0) {
    todoListHTML += `<div class="delete-all-container">
      <button class="js-delete-all delete-all-button">Delete All</button>
    </div>`;
  }

  document.querySelector(".js-todo-container").innerHTML = todoListHTML;

  document.querySelectorAll(".js-delete-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      renderTodoList();
    });
  });
}

function updateAddButtonState() {
  const nameInput = document.querySelector(".js-todo-input");
  const dateInput = document.querySelector(".js-todo-date");
  const addButton = document.querySelector(".js-add-todo");

  if (nameInput.value.trim() === "" || dateInput.value === "") {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
}

document
  .querySelector(".js-todo-input")
  .addEventListener("input", updateAddButtonState);
document
  .querySelector(".js-todo-date")
  .addEventListener("input", updateAddButtonState);

document.querySelector(".js-add-todo").addEventListener("click", () => {
  const name = document.querySelector(".js-todo-input").value;
  const duedate = document.querySelector(".js-todo-date").value;
  todoList.push({
    name: name,
    duedate: duedate,
  });

  document.querySelector(".js-todo-input").value = "";
  document.querySelector(".js-todo-date").value = "";

  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
  updateAddButtonState();
});

document.querySelector(".js-delete-all").addEventListener("click", () => {
  if (
    todoList.length > 0 &&
    confirm("Are you sure you want to delete all todos?")
  ) {
    todoList = [];
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();
  }
});
