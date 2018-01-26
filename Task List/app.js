const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const filterDiv = document.querySelector('#filterDiv');
const taskInput = document.querySelector('#task');
const taskTitle = document.querySelector('#task-title');

taskList.style.display = 'none';
filterDiv.style.display = 'none';
clearBtn.style.display = 'none';
taskTitle.innerText = 'No Tasks';

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
        console.log('meh')
    } else {

        const li = document.createElement('li');
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

        taskList.style.display = 'block';
        clearBtn.style.display = 'block';
        filterDiv.style.display = 'block';

        taskInput.value = '';
        taskTitle.innerText = 'Tasks';
    }
    e.preventDefault();

}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            if (document.querySelectorAll('.collection-item').length === 0) {
                taskList.style.display = 'none';
                clearBtn.style.display = 'none';
                filterDiv.style.display = 'none';
                taskTitle.innerText = `${taskList.length} Tasks`;
            }
        }
    }
    e.preventDefault();
}

function clearTasks(e) {

    if (confirm('Are you sure you want to clear all tasks?')) {
        // while tasklist has a first child remove the first child.
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        console.log('deleted');
        taskList.style.display = 'none';
        clearBtn.style.display = 'none';
        filterDiv.style.display = 'none';
        taskTitle.innerText = 'No Tasks'
        event.preventDefault();
    }
    e.preventDefault();
}

function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}