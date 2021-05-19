// Selectors:
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners:
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions:
function addTodo (event) {
    // Prevent form from submit
    event.preventDefault();

    // Construct Wrapper Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // Append LI to Div
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(todoInput.value);

    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');

    // Append completedButton to Div
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');

    // Append trashButton to Div
    todoDiv.appendChild(trashButton);

    // Attach Wrapper Div to actual List
    todoList.appendChild(todoDiv);

    // Clear Input
    todoInput.value = '';
}

function deleteCheck (event) {
    // Get Target
    const item = event.target;

    // Delete the todo, if trash clicked
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }

    // Check the todo, if check clicked
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo (event) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (event.target.value) {  
        case 'all':
            todo.style.display = 'flex';
            break;
        case 'completed':
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        case 'uncompleted':
            if (!todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
            break;
        }
    });
}

function saveLocalTodos (todo) {
    // Check if it is already there
    let todos;

    if (localStorage.getItem('todos') === null) {
        // Re-init the array
        todos = [];
    } else {
        // Get todos from local
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // Push data to local
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
    let todos;

    if (localStorage.getItem('todos') === null) {
        // Re-init the array
        todos = [];
    } else {
        // Get todos from local
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        // Construct Wrapper Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        // Append LI to Div
        todoDiv.appendChild(newTodo);

        // Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');

        // Append completedButton to Div
        todoDiv.appendChild(completedButton);

        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');

        // Append trashButton to Div
        todoDiv.appendChild(trashButton);

        // Attach Wrapper Div to actual List
        todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos (todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        // Re-init the array
        todos = [];
    } else {
        // Get todos from local
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}