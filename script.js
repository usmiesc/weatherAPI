const apiKey = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

document.getElementById('search-form').addEventListener('submit',function (e) {
    e.perventDefault();
    const city = document.getElementById("city-input").value;
    getWeatherData(city);   
});

async function getWeatherData(city){
    try{
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}')
        const data = await response.json();
        displayCurrentWeather (data);

        const forecastResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}')
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
        } catch (error) {
            console.log('Error grabbing your weather data:',error);
        }
}

function displayCurrentWeather(data){

    const city = data.name;
    const data = new Date(data.dt * 1000).toLocaleDateString();
    const weatherIcon =  data.weather[0].icon;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const currentData = document.getElementById('current-data');
  currentData.innerHTML = `
    <h3>${city}</h3>
    <p>Date: ${date}</p>
    <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
    <p>Temperature: ${temperature} K</p>
    <p>Humidity: ${humidity} %</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
  `;}

function displayForecast(data){

    const forecastData = data.list.slice(0,5);
    const forecastContainer =document.getElementById('forecast-data');
    forecastContainer.innerHTML='';

    forecastData.forEach((forcast) => {
        const date = new Date (forecast.dt *1000).toLocaleDateString();
        const weatherIcon = forecast.weather[0].icon;
        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        const forcastCard = document.createElement('div');
        forcastCard.classList.add('forcast-card');
        forcastCard.innerHTML =  `
        <h3>${date}</h3>
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;

      forecastContainer.appendChild(forcastCard);
    });
}

