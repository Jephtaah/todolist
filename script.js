let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList();

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

  document.querySelector(".js-todo-container").innerHTML = todoListHTML;

  document.querySelectorAll(".js-delete-button").forEach((button, index) => {
    button.addEventListener("click", () => {
      todoList.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
      renderTodoList();
    });
  });
}

document.querySelector(".js-add-todo").addEventListener("click", () => {
  const name = document.querySelector(".js-todo-input").value;
  const duedate = document.querySelector(".js-todo-date").value;
  todoList.push({
    name: name,
    duedate: duedate,
  });

  document.querySelector(".js-todo-input").value = "";
  document.querySelector(".js-todo-date").value = "";

  localStorage.setItem('todoList', JSON.stringify(todoList));
  renderTodoList();
});
