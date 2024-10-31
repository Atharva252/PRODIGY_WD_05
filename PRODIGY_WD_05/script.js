// API Key for OpenWeatherMap
const apiKey = '7f0773a24030dd938b6e6c98f6047408';

// DOM Elements
const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherDisplay = document.getElementById('weatherDisplay');

// Fetch Weather Data Function
async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            weatherDisplay.innerHTML = `<p>Location not found. Please try again.</p>`;
        }
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    }
}

// Display Weather Data Function
function displayWeather(data) {
    const { name, main, weather } = data;
    const weatherHtml = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDisplay.innerHTML = weatherHtml;
    weatherDisplay.style.display = 'block';
}

// Event Listener for Button
getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        weatherDisplay.innerHTML = `<p>Please enter a location.</p>`;
        weatherDisplay.style.display = 'block';
    }
});
