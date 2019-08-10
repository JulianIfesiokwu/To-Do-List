//Variables
const input = document.querySelector('input');
let deleteBtn = document.querySelector('.delete');
const saveBtn = document.querySelector('.save');
const clearBtn = document.querySelector('.clear');
const completed = document.querySelector('.completed');
const uncompleted = document.querySelector('.uncompleted');
const clearAllBtn = document.querySelector('.clear-all');

//EventListeners
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getScheduledTasks);
    input.addEventListener('keypress', keyCodePress);
    if(deleteBtn) {
        document.addEventListener('click', deleteScheduledTask);
    };
    saveBtn.addEventListener('click', addTask);
    clearBtn.addEventListener('click', clearInput);
    uncompleted.addEventListener('click', getCompletedTask);
    completed.addEventListener('click', deleteTask);
    clearAllBtn.addEventListener('click', clearLists);
};

loadEventListeners();

//Functions
function addTask(event) {
    const userTask = input.value;

    if ( userTask.length <= 2 || userTask.length === null) {
        showError();
    } else {
    showTask(userTask);
    input.value = '';
    input.focus();
    }
}

function clearInput(event) {
    input.value = '';
    input.focus();
}

function showTask(userTask) {
    const uncompleted = document.querySelector('.uncompleted');
    let newli = document.createElement('li');
    newP = document.createElement('p');
    newP.textContent = userTask;
    newP.classList.add('task-scheduled');
    createSaveButton();
    newli.appendChild(newP);
    newli.appendChild(newBtn);
    uncompleted.appendChild(newli);
    storeInScheduledLS(userTask);
}

function deleteScheduledTask(event) {
    if( event.target.classList.contains('delete') ) {
        event.target.parentElement.remove();
    }
    input.focus();
}

function showCompletedTask(completedTask) {
    const completed = document.querySelector('.completed');
    let newli = document.createElement('li');
    newP = document.createElement('p');
    newP.textContent = completedTask;
    newli.appendChild(newP);
    createDeleteButton();
    newli.appendChild(deleteBtn);
    completed.appendChild(newli);
}

function getCompletedTask(event) {
    if( event.target.classList.contains('save') ) {
        completedTask = event.target.previousSibling.textContent;
        showCompletedTask(completedTask);
        deleteTask();
    }    
}

function createDeleteButton() {
    deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'delete', 'align');
    deleteBtn.textContent = 'delete';    
}

function createSaveButton() {
    newBtn = document.createElement('button');
    newBtn.classList.add('btn', 'save', 'delete', 'align');
    newBtn.textContent = 'save';
}

function deleteTask() {
    if( event.target.classList.contains('delete') ) {
        event.target.parentElement.remove();
    }
    input.focus();

    //remove from local storage
    deleteTaskLocalStorage(event.target.parentElement)
}

function deleteTaskLocalStorage(userTask) {
    //console.log(userTask)
    removeItem(userTask);
}

function clearLists(event) {
    const uncompleted = document.querySelector('.uncompleted');
    const completed = document.querySelector('.completed');
    while(uncompleted.firstChild) {
        uncompleted.removeChild(uncompleted.firstChild);
    }
        while(completed.firstChild) {
            completed.removeChild(completed.firstChild);
        }
        input.focus();
    };

function showError() {
    const errorDiv = document.querySelector('.error');
    errorDiv.textContent = 'Please complete the task field';
    errorDiv.style.display = 'block';
    errorDiv.style.backgroundColor = '#B22222';
    errorDiv.style.color = '#FFFFFF';
    
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 2500);
    input.focus();
};


function keyCodePress(event) {
    const userTask = input.value;
    if (userTask.length <= 2 && userTask.length === null) {
        showError();
    } else if (userTask.length > 2 && userTask.length !== null && event.keyCode === 13) {
        event.preventDefault();
    showTask(userTask);
    storeInScheduledLS(userTask);
    input.value = '';
    input.focus();
    }
}


function storeInScheduledLS(userTask) {
    let scheduledTasks;

    if (localStorage.getItem('scheduledTasks') === null) {
        scheduledTasks = [];
    } else {
        scheduledTasks = JSON.parse(localStorage.getItem('scheduledTasks') );
    }
    scheduledTasks.push(userTask);

    localStorage.setItem('scheduledTasks', JSON.stringify(scheduledTasks) );
}

function getScheduledTasks() {
    let scheduledTasks;
    if (localStorage.getItem('scheduledTasks') === null) {
        scheduledTasks = [];
    } else {
        scheduledTasks = JSON.parse(localStorage.getItem('scheduledTasks') );
    }
    scheduledTasks.forEach(function(userTask) {
    const uncompleted = document.querySelector('.uncompleted');
    let newli = document.createElement('li');
    newP = document.createElement('p');
    newP.textContent = userTask;
    newP.classList.add('task-scheduled');
    createSaveButton();
    createDeleteButton();
    newli.appendChild(newP);
    newli.appendChild(newBtn);
    uncompleted.appendChild(newli);
    });
}