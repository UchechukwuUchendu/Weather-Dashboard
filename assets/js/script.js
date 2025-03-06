/* script.js */
document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const weatherInfo = document.getElementById('weatherInfo');
    
    errorMessage.classList.add('hidden');
    weatherInfo.classList.add('hidden');

    if (!location) {
        errorMessage.textContent = 'Please enter a location';
        errorMessage.classList.remove('hidden');
        return;
    }
    
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q.Southampton&appid.f71ddccb11c58ebbf12f54e59a20fa3cD`)
        .then(response => response.json())
        .then(geoData => {
            if (!geoData.length) {
                errorMessage.textContent = 'Location not found';
                errorMessage.classList.remove('hidden');
                return;
            }
            
            const { lat, lon, name } = geoData[0];
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`)
                .then(response => response.json())
                .then(weatherData => {
                    if (weatherData.cod !== 200) {
                        errorMessage.textContent = 'Unable to retrieve weather data';
                        errorMessage.classList.remove('hidden');
                        return;
                    }
                    document.getElementById('locationName').textContent = name;
                    document.getElementById('temperature').textContent = weatherData.main.temp;
                    document.getElementById('weatherDescription').textContent = weatherData.weather[0].description;
                    weatherInfo.classList.remove('hidden');
                });
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching weather data';
            errorMessage.classList.remove('hidden');
            console.error('Error fetching weather data:', error);
        });
});