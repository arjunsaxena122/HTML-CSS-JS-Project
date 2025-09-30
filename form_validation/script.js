function main() {
    const form = document.getElementById("form-container")
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")

    emailInput.addEventListener("input", () => validateEmail(emailInput))
    passwordInput.addEventListener("input", () => validatePassword(passwordInput))
    form.addEventListener("submit", validateForm)
}

function validateForm(e) {
    e.preventDefault()

    const isEmailValid = validateEmail(e.target.email)
    const isPasswordValid = validatePassword(e.target.password)

    if (!(e.target.email.value.trim()) || !(e.target.password.value.trim())) {
        return alert("Please fill all the required fields")
    }

    if (isEmailValid && isPasswordValid) {
        alert("Form submitted successfully ")
    } else {
        alert("Invalid details")
    }
}

function validateEmail(input) {

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailReg.test(input.value)) {
        input.classList.add("valid")
        input.classList.remove("invalid")
        return true
    } else {
        input.classList.add("invalid")
        input.classList.remove("valid")
        return false
    }

}

function validatePassword(input) {

    if (input.value.length >= 8 && input.value.length <= 16) {
        input.classList.add("valid")
        input.classList.remove("invalid")
        return true
    } else {
        input.classList.add("invalid")
        input.classList.remove("valid")
        return false
    }

}

main()

