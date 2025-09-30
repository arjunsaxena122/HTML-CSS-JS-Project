async function getDataFromServer() {
    const res = await fetch("./questions/question.json")
    const data = await res.json()
    return data
}

async function main(currentValue) {
    const root = document.getElementById("root")
    const subRoot = document.querySelector(".subRoot")
    const data = await getDataFromServer()

    if (subRoot) {
        subRoot.remove()
    }

    const filterData = data.filter(v => v.id === currentValue)
    filterData.map((v) => {
        const subRoot = document.createElement("div")
        subRoot.id = v.id
        subRoot.classList.add("subRoot")
        const div = document.createElement("div")
        div.classList.add("ques")
        const subOption = document.createElement("div")
        subOption.classList.add("list-container")
        div.innerHTML = `${v.id}. \t ${v.question}`
        subRoot.append(div)
        v.options.map(o => {
            const label = document.createElement("label")
            const input = document.createElement("input")
            label.setAttribute("for", o)
            input.type = "radio"
            input.name = v.id
            input.id = o
            input.value = o
            input.classList.add("option")
            label.append(input)
            label.append(document.createTextNode(o))
            subOption.append(label)

            input.addEventListener("change", () => {
                if (input.value === v.answer) {
                    console.log("Correct answer")
                    label.style.backgroundColor = "green"
                } else {
                    console.log("Wrong answer")
                    label.style.backgroundColor = "red"
                }
            })


        })
        subRoot.append(subOption)
        root.append(subRoot)
    })

}

async function setActiveLink(currentValue){
    const list = Array.from(document.getElementsByClassName("pagination-list"))
    list.forEach(li => {
        li.classList.remove("active")
        if(parseInt(li.id) === currentValue){
            li.classList.add("active")
        }
    })
}


async function quizPagination() {
    const prevBtn = document.querySelector("#prev-btn")
    const nextBtn = document.querySelector("#next-btn")
    const data = await getDataFromServer()
    data.map((v) => {
        const ul = document.querySelector("#pagination-ul")
        ul.classList.add("pagination-ul")
        const li = document.createElement("li")
        li.id = v.id
        li.classList.add("pagination-list")
        li.innerHTML = v.id
        ul.append(li)
    })
    let currentValue = 1
    prevBtn.addEventListener("click", () => {
        if (currentValue > 1) {
            currentValue--
        }
        main(currentValue)
        setActiveLink(currentValue)
    })
    nextBtn.addEventListener("click", () => {
        if (currentValue < data.length) {
            currentValue++
        }
        main(currentValue)
        setActiveLink(currentValue)
    })
    main(currentValue)
    setActiveLink(currentValue)
}

quizPagination()
