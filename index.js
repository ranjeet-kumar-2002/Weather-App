const apiKey = "a90f11f94797183654df3ade6ce76af5"
const weatherDataElement = document.querySelector(".weather-data");
const cityName = document.querySelector("#city-name");
const formelement = document.querySelector("form");
const imageIcon = document.querySelector(".icon");

formelement.addEventListener("submit",(e)=>{
    // console.log(cityName.value);
    e.preventDefault();
    const cityValue = cityName.value;
    getWeatherData(cityValue);
});

 async function getWeatherData(cityValue){
    try {
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if(!response.ok) {
            throw new Error ("Network response is not ok!");
        }
        const data = await response.json();
        console.log(data);
        const temprature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataElement.querySelector(".temp").textContent = `${temprature}°C`;
        weatherDataElement.querySelector(".desc").textContent = `${description}`;
        imageIcon.innerHTML =`<img src="https://openweathermap.org/img/wn/${icon}.png" alt=""/>`

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail)=>{
            return `<div>${detail}</div>`
         }).join("")
    }
    catch (error) {
        weatherDataElement.querySelector(".temp").textContent = ""
        imageIcon.innerHTML = ""
        weatherDataElement.querySelector(".desc").textContent = "An Error Occurred!"
        }
 }
   