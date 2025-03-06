/* script.js */


const API_KEY = "f23ee9deb4e1a7450f3157c44ed020e1";

navigator.geolocation.getCurrentPosition(setWindyAPI);

function setWindyAPI(position)
{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    document.getElementById("windyAPI").src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;
}

document.getElementById("getWeather").addEventListener("click",function(e) {
    console.clear();

    let city;
    if(document.getElementById("city").value=="")
    {navigator.geolocation.getCurrentPosition(findCurrentLocation)} // default
    else
    {city = document.getElementById("city").value;
    let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    
    fetch(geoURL)
        .then((response) => response.json())
        .then((data) => findLocation(data))
        .catch((error) => console.error("Fetch error:", error));
    }    
})

function findLocation(data) {

    console.log(data);
    data = data[0];

    findWeather(data["lat"], data["lon"]);

}

function findCurrentLocation(position)
{
    findWeather(position.coords.latitude, position.coords.longitude);
}

function findWeather(lat, lon) {
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => outputWeather(data))
    .catch((error) => console.error("Fetch error:", error));

    fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => outputForecast(data))
    .catch((error) => console.error("Fetch error:", error));

}

function outputWeather(data) {
    //console.log(data);

    document.getElementById("o-city").textContent = `City name: ${data["name"]}`;
    document.getElementById("o-lat").textContent = `Latitude: ${data["coord"]["lat"]}°`;
    document.getElementById("o-lon").textContent = `Longitude: ${data["coord"]["lon"]}°`;

    document.getElementById("o-temp").textContent = `Temperature: ${data["main"]["temp"]}°C`;
    document.getElementById("o-feelslike").textContent = `Feels like: ${data["main"]["feels_like"]}°C`;
    document.getElementById("o-humidity").textContent = `Humidity: ${data["main"]["humidity"]}%`;

    //make first letter capital
    /*let desc = data["weather"][0]["description"].split(" ");
    for(var item of desc){
        item[0] = item[0].toUpperCase();
    }*/
    document.getElementById("o-weatherdesc").textContent = `Weather description ${data["weather"][0]["description"]}`;//desc.join(" ")

    document.getElementById("o-windspeed").textContent = `Wind speed: ${data["wind"]["speed"]}m/s`;
}

function outputForecast(data) {
    console.log(data);

    let text = "";
    let text2 = "";
    for(var item of data["list"])
    {
        if(item["dt_txt"].split(" ")[1].split(":")[0]=="12")
        {
            text += `${item["main"]["temp"]}°C, `;
            text2 += `${item["weather"][0]["main"]}, `;
        }

    }
    //text[text.length()-1]="";
    //text2[text2.length()-1]="";
    // each day at 12 in the list: 5 13 21 19 37

    document.getElementById("o-wfctemp").textContent = `${text}`;
    document.getElementById("o-wfcweather").textContent = `${text2}`;
}    
