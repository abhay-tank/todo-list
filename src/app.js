let todoList = [];

window.onload = () => {
  console.log("checking if todo exist");
  if (localStorage.getItem("todoList")) {
    todoList = JSON.parse(localStorage.getItem("todoList"));
    updateUI();
  }
  console.log(todoList);
};

let updateLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

let updateUI = () => {
  let listDiv = document.getElementById("list-container");
  listDiv.querySelectorAll("*").forEach((node) => {
    node.remove();
  });
  todoList.forEach((todo) => {
    let listItem = document.createElement("div");
    let listContent = document.createElement("h3");
    let todoDelete = document.createElement("button");
    todoDelete.setAttribute("onclick", `deleteTodo(${todo.todoID})`);
    let deleteIcon = document.createElement("img");
    deleteIcon.classList.add("list-icons");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.setAttribute("src", "./images/remove.svg");
    todoDelete.appendChild(deleteIcon);
    let todoSuccess = document.createElement("button");
    todoSuccess.setAttribute("onclick", `completedTodo(${todo.todoID})`);
    let successIcon = document.createElement("img");
    successIcon.classList.add("list-icons");
    successIcon.classList.add("success-icon");
    successIcon.setAttribute("src", "./images/done.svg");
    todoSuccess.appendChild(successIcon);
    listContent.setAttribute("id", todo.todoID);
    listContent.innerHTML = todo.todoContent;
    listItem.classList.add("list-item");
    listItem.appendChild(listContent);
    if (todo.success == true) {
      listItem.classList.add("done");
    } else {
      listItem.appendChild(todoSuccess);
    }
    listItem.appendChild(todoDelete);
    listDiv.appendChild(listItem);
  });
};

let addItem = (event) => {
  event.preventDefault();
  let todoItem = document.getElementById("todo-input").value;
  if (todoItem.length <= 0) {
    alert("Empty Todo cannot be added");
  } else {
    todoID = Math.random() * Date.now();
    todoID = todoID.toString() + Date.now();
    console.log(todoID);
    let todoItemObject = {
      todoID: todoID,
      todoContent: todoItem,
      success: false,
    };
    todoList.push(todoItemObject);
    updateLocalStorage();
    updateUI();
  }
};

let findIndex = (itemID) => {
  return todoList.findIndex(
    (todoItemObject) => todoItemObject.todoID == itemID
  );
};

let completedTodo = (itemID) => {
  let index = findIndex(itemID);
  todoList[index].success = true;
  updateLocalStorage();
  updateUI();
};

let deleteTodo = (itemID) => {
  let index = findIndex(itemID);
  todoList.splice(index, 1);
  updateLocalStorage();
  updateUI();
};
