const form = document.querySelector("#form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const message = document.getElementById("message")

    if (!name.value || !email.value || !message.value) {
        return alert("Please enter your detials")
    }

    const formData = {
        name: name.value,
        email: email.value,
        message: message.value
    }

    const data = new FormData()
    data.append("contact", JSON.stringify(formData))

    for (const value of data.values()) {
        const parseValue = JSON.parse(value)
        console.log(parseValue)
        alert("Your form is submitted, Check in console")
    }


})