async function callWeatherApi(cityname = "aligarh") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=2af32eea6dccdedc7834286bcb3cf8fa`
    const res = await fetch(url)
    const _json_response = await res.json()
    return _json_response
}

function updateUI(data) {
    const weather = document.getElementById("weather")
    const temp = document.getElementById("temp")
    const weatherIcon = document.getElementById("weather-icon")
    const speed = document.getElementById("speed")
    const degree = document.getElementById("degree")
    const gust = document.getElementById("gust")
    const feels_like = document.getElementById("feels_like")
    const pressure = document.getElementById("pressure")
    const humidity = document.getElementById("humidity")
    const sea_level = document.getElementById("sea_level")
    const ground_level = document.getElementById("ground_level")

    weather.innerText = data?.weather?.[0]?.main || "N/A"
    temp.innerText = (data?.main?.temp - 273.15).toFixed(1) + "°C"
    feels_like.innerText = (data?.main?.feels_like - 273.15).toFixed(1) + "°C"
    pressure.innerText = data?.main?.pressure + " hPa"
    humidity.innerText = data?.main?.humidity + " %"
    sea_level.innerText = data?.main?.sea_level ? data.main.sea_level + " hPa" : "N/A"
    ground_level.innerText = data?.main?.grnd_level ? data.main.grnd_level + " hPa" : "N/A"
    speed.innerText = data?.wind?.speed + " m/s"
    degree.innerText = data?.wind?.deg + "°"
    gust.innerText = data?.wind?.gust ? data.wind.gust + " m/s" : "N/A"

    const mainWeather = data?.weather?.[0]?.main || ""
    if (mainWeather === "Clear") {
        weatherIcon.innerText = "☀️"
    } else if (mainWeather === "Clouds") {
        weatherIcon.innerText = "☁️"
    } else if (mainWeather === "Rain") {
        weatherIcon.innerText = "🌧️"
    } else if (mainWeather === "Snow") {
        weatherIcon.innerText = "❄️"
    } else if (mainWeather === "Thunderstorm") {
        weatherIcon.innerText = "⚡"
    } else {
        weatherIcon.innerText = "🌤️"
    }
}


function main() {
    const form = document.getElementById("form-weather")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const cityname = e.target.city.value
        const cityData = await callWeatherApi(cityname)
        updateUI(cityData)
    })
}

main()