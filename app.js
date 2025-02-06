const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const image = document.querySelector(".image");
const tempurature = document.querySelector(".tempurature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city){
    const api_key = "9eceb3420ee081e9d6ffe4d39da72467";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${URL}`).then(response => response.json());
    if(weather_data.cod == '404'){
        location_not_found.style.display = "flex"
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    console.log(weather_data);
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    tempurature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds':
            image.src = "cloud.png";
            break;
        case 'Clear':
            image.src = "clear.png";
            break;
        case 'Mist':
            image.src = "mist.png";
            break;
        case 'Rain':
            image.src = "rain.png";
            break;
        case 'Snow':
            image.src = "snow.png";
        break;              
    }
}
searchBtn.addEventListener("click",()=>{
    checkWeather(inputBox.value);
})