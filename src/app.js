import { createTodoMarkup } from "./helper/createTodoMarkup.js";
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
	// Remove all UI elements and Build again with updated datas
	listDiv.querySelectorAll("*").forEach((node) => {
		node.remove();
	});
	todoList.forEach((todo) => {
		listDiv.appendChild(createTodoMarkup(todo));
	});
};

let addItem = (event) => {
	event.preventDefault();
	let todoItemInput = document.getElementById("todo-input");
	let todoItem = todoItemInput.value;
	if (todoItem.length <= 0) {
		alert("Empty Todo cannot be added");
	} else {
		let todoID = Math.random() * Date.now();
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
	todoItemInput.value = "";
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

window.addItem = addItem;
window.completedTodo = completedTodo;
window.deleteTodo = deleteTodo;
