function main() {

    const form = document.getElementById("form")

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const input = document.getElementById("ingrident-finder")
        const resultContainer = document.getElementById("result")

        if (!input.value) return alert("Please enter ingredient")
        const value = input.value
        const ingradient_meals = await apiCalling(value)
        if (!ingradient_meals) return alert(`${input.value} is invalid ingredient`)

        resultContainer.innerHTML = ingradient_meals.map((meal) =>
            `<div class="meal-card">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            </div>`
        ).join("")

    })

}

async function apiCalling(ingradient) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingradient}`
    const res = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });
    const json = await res.json()
    return json.meals
}

main()
