function main() {
    const div = document.createElement("div")
    div.id = "lightbox"
    document.body.appendChild(div)

    const images = document.querySelectorAll("img")
    images.forEach((image) => {
        image.addEventListener("click", () => {
            div.innerHTML = ""
            div.classList.add("active")
            const img = document.createElement("img")
            img.src = image.src
            div.appendChild(img)
        })
    })

    div.addEventListener("click", () => {
        lightbox.classList.remove("active")
    })
}


main()