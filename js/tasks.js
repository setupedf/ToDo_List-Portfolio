// HTML elements
const form = document.querySelector('.main-form')
const input = form.querySelector('.main-form-input')
const taskTemplate = document.querySelector('.main-tasks-list-item')
const emptyBlock = document.querySelector('.main-empty')
const tasks = document.querySelector('.main-tasks')
const list = tasks.querySelector('.main-tasks-list')
const addedQuantity = document.querySelector('.main-info-added-quantity')
const completedQuantity = document.querySelector('.main-info-completed-quantity')

// Variables
let taskIdArray = []

// console.log(taskTemplate)

// Event Listeners
form.addEventListener('submit', e => {

    // Prevent default behaviour - Page reload
    e.preventDefault()

    const taskValue = input.value
    const taskId = Date.now()

    if (taskValue === "") {
        return null
    }

    input.value = ''

    console.log(taskId + ' --- ' + taskValue)

    // Add task id to array
    addTaskIdToArray(taskId)

    // Check if any task exists and show main tasks list
    checkTasksExistence()

    // Return new task element created 
    const newTask = addTaskToDOM(taskId, taskValue)

    // Change added tasks quantity
    incrementAddedTasks()

    // Add Event Listeners to new task
    addEventListenersToTask(newTask)

})

// Functions
function addTaskToDOM(taskId, taskValue) {
    const newTask = taskTemplate.cloneNode(true)
    newTask.setAttribute('task-id', taskId)

    const taskText = newTask.querySelector('.main-tasks-list-item-state-text')
    taskText.textContent = taskValue
    
    list.appendChild(newTask)

    return newTask
}

function addTaskIdToArray(taskId) {
    taskIdArray.push(taskId)
}

function addEventListenersToTask(newTask) {
    const stateIcon = newTask.querySelector('.main-tasks-list-item-state')
    const deleteIcon = newTask.querySelector('.main-tasks-list-item-delete')
    const text = newTask.querySelector('.main-tasks-list-item-state-text')

    deleteIcon.addEventListener('click', () => {
        deleteTaskFromDom(newTask)
        deleteTaskIdFromArray(newTask.getAttribute("task-id"))
        decrementAddedTasks()
        checkTasksExistence()
    })

    stateIcon.addEventListener('click', () => {
        markTaskAsCompleted(newTask)
    })

    text.addEventListener('click', () => {
        markTaskAsCompleted(newTask)
    })
}

function deleteTaskFromDom(task) {
    list.removeChild(task)
}

function deleteTaskIdFromArray(taskId) {
    taskIdArray = taskIdArray.filter(id => id != taskId)
}

function checkTasksExistence() {
    if (taskIdArray.length > 0) {
        tasks.style.visibility = 'visible'
        emptyBlock.style.display = 'none'
    }
    else {
        emptyBlock.style.display = 'flex'
    }
}

function incrementAddedTasks() {
    addedQuantity.textContent = Number(addedQuantity.textContent) + 1
}

function decrementAddedTasks() {
    addedQuantity.textContent = Number(addedQuantity.textContent) - 1
}
