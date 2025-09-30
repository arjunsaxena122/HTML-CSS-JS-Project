

(function getDataFromLocalStroage() {
    const data = localStorage.getItem("task")
    updatedUI(data)
}
)()

let isUpdateTask = null


function deleteTask(e) {
    const list = e.target.parentElement
    const data = JSON.parse(localStorage.getItem("task")) || []
    const updatedTaskData = data.filter((task) => task.id !== Number(list.id))
    localStorage.setItem("task", JSON.stringify(updatedTaskData))
    updatedUI(JSON.stringify(updatedTaskData))
}

function updateTask(e) {
    const data = JSON.parse(localStorage.getItem("task")) || []
    const taskId = e.target.parentElement.id
    const input = document.getElementById("task-input-box")
    const btn = document.getElementById("task-btn")

    const filterUpdateTask = data.filter((task) => task.id === Number(taskId))
    input.value = filterUpdateTask?.[0].task
    isUpdateTask = filterUpdateTask?.[0].id
    btn.innerHTML = "Save"
    console.log("updated function calling")
}

function taskIsCompleted(e) {
    const data = JSON.parse(localStorage.getItem("task")) || []
    const listId = Number(e.target.parentElement.id)
    const updatedData = data.map(task =>
        task.id === listId ? { ...task, isCompleted: e.target.checked } : task
    )
    localStorage.setItem("task", JSON.stringify(updatedData))
    updatedUI(JSON.stringify(updatedData))
}

function updatedUI(data) {
    const div = document.querySelector(".container")

    const existingUl = div.querySelector("ul")
    if (existingUl) {
        existingUl.remove()
    }

    const ul = document.createElement("ul")
    const updateData = JSON.parse(data) || []
    updateData.map((tasks) => {
        const nodeData = document.createTextNode(tasks.task)
        const span = document.createElement("span")
        span.id = "task-isCompleted"
        const li = document.createElement("li")
        li.id = tasks.id
        li.classList.add("list-item")
        const updateBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const input = document.createElement("input")
        updateBtn.innerText = "Update task"
        deleteBtn.innerText = "Delete task"
        input.type = "checkbox"
        input.id = "is-checked"
        input.checked = tasks.isCompleted
        span.appendChild(nodeData)
        li.appendChild(span)
        li.append(updateBtn)
        li.append(deleteBtn)
        li.append(input)
        ul.appendChild(li)

        if (tasks.isCompleted) {
            span.classList.add("task-text")
        }

        deleteBtn.addEventListener("click", deleteTask)
        updateBtn.addEventListener("click", updateTask)
        input.addEventListener("change", taskIsCompleted)
    })

    div.appendChild(ul)
}


async function main() {
    const form = document.getElementById("task-box")
    let taskStorage = JSON.parse(localStorage.getItem("task")) || []
    let count = taskStorage.length ? taskStorage.length : 0;
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const value = e.target.task.value
        if (!value) return alert("Please type something")
        if (isUpdateTask) {
            const updatedTask = taskStorage.map(task => task.id === Number(isUpdateTask) ? { ...task, task: value } : task)
            console.log(updatedTask)
            updatedUI(JSON.stringify(updatedTask))
            localStorage.setItem("task", JSON.stringify(updatedTask))
            isUpdateTask = null
            document.getElementById("task-btn").innerHTML = "Submit"
        }
        else {
            taskStorage.push({ id: ++count, task: value, isCompleted: false })
            updatedUI(JSON.stringify(taskStorage))
            localStorage.setItem("task", JSON.stringify(taskStorage))
            e.target.task.value = ""
        }
    })

}

main()