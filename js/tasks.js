// HTML elements
const form = document.querySelector('.main-form')
const input = form.querySelector('.main-form-input')
const taskTemplate = document.querySelector('.main-tasks-list-item')
const emptyBlock = document.querySelector('.main-empty')
const tasks = document.querySelector('.main-tasks')
const list = tasks.querySelector('.main-tasks-list')
const addedQuantity = document.querySelector('.main-info-added-quantity')
const completedQuantityTotal = document.querySelector('.main-info-completed-quantity')

// Variables
let taskIdArray = []
let queuedQuantity = 0
let completedQuantity = 0

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

    // Increment queuedQuantity
    queuedQuantity++

    updateTotal()

})

// Functions
function addTaskToDOM(taskId, taskValue) {
    const newTask = taskTemplate.cloneNode(true)
    newTask.setAttribute('task-id', taskId)
    newTask.setAttribute('state', 'uncompleted')

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
        
        queuedQuantity--

        if (newTask.getAttribute('state') == 'completed') {
            completedQuantity--
        }

        updateTotal()
    })

    stateIcon.addEventListener('click', () => {
        changeTaskState(newTask, text)
    })
    
    text.addEventListener('click', () => {
        changeTaskState(newTask, text)     
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


function updateTotal() {
    if (taskIdArray.length <= 0) {
        queuedQuantity = '0'
        completedQuantityTotal.textContent = queuedQuantity
    } else {
        completedQuantityTotal.textContent = completedQuantity + ' из ' + queuedQuantity 
    }

}

function changeTaskState(task, text) {
    const img = task.querySelector('.main-tasks-list-item-state-img')
    
    if (task.getAttribute('state') === 'completed') {
        
        // Change img link to mark the task as uncompleted
        img.setAttribute('src', 'img/Main-state.svg')
    
        task.setAttribute('state', 'uncompleted')
    
        // Increment completed quantity
        completedQuantity--

        text.style.textDecorationLine = 'none'
        text.style.color = '#F2F2F2'
    }
    else if (task.getAttribute('state') === 'uncompleted') {
        
        // Change img link to mark the task as completed
        img.setAttribute('src', 'img/Main-completed.svg')
    
        task.setAttribute('state', 'completed')
    
        // Increment completed quantity
        completedQuantity++

        text.style.textDecorationLine = 'line-through'
        text.style.color = '#808080'
    }

    updateTotal()
} 