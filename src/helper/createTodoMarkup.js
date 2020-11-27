const createTodoMarkup = (todo) => {
	let listItem = document.createElement("div");
	let listContent = document.createElement("h3");
	let todoDelete = document.createElement("img");
	todoDelete.addEventListener("click", () => {
		deleteTodo(todo.todoID);
	});
	todoDelete.classList.add("list-icons");
	todoDelete.classList.add("delete-icon");
	todoDelete.src = "./images/remove.svg";
	todoDelete.title = "Delete Todo";
	let todoSuccess = document.createElement("img");
	todoSuccess.addEventListener("click", () => {
		completedTodo(todo.todoID);
	});
	todoSuccess.classList.add("list-icons");
	todoSuccess.classList.add("success-icon");
	todoSuccess.src = "./images/done.svg";
	todoSuccess.title = "Completed Todo";
	listContent.setAttribute("id", todo.todoID);
	listContent.innerHTML = todo.todoContent;
	listItem.classList.add("list-item");
	listItem.appendChild(listContent);
	let buttonContainer = document.createElement("div");
	buttonContainer.classList.add("flex-row");
	if (todo.success == true) {
		listItem.classList.add("done");
	} else {
		buttonContainer.appendChild(todoSuccess);
	}
	buttonContainer.appendChild(todoDelete);
	listItem.appendChild(buttonContainer);
	return listItem;
};

export { createTodoMarkup };
