function contactForm() {
    const form = document.querySelector("#form")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const message = document.getElementById("message")

        if (!name || !email || !message) {
            alert("Please fill all the fields")
        }

        const formData = {
            name: name.value,
            email: email.value,
            message: message.value
        }

        const data = new FormData()
        data.append("formData", JSON.stringify(formData))

        for (const value of data.values()) {
            console.log(JSON.parse(value))
        }

        name.value = ""
        email.value = ""
        message.value = ""

        alert("Form submitted successfully!")

    })
}

contactForm()