var searchButton = document.getElementById('search-button');
var userInput = document.getElementById('user-input')

// Id selectors for the elements that make up the card of the current day's weather
var currentCityName = document.getElementById('current-city');
var currentCityIcon = document.getElementById('current-symbol');
var currentCityTemp = document.getElementById('temp');
var currentCityWind = document.getElementById('wind');
var currentCityHumidity = document.getElementById('humidity');

// Id selectors for the elements of the forecast cards
var forecast1Date = document.getElementById('date-1');
var forecast1Symbol = document.getElementById('symbol-1');
var forecast1Temp = document.getElementById('temp-1');
var forecast1Wind = document.getElementById('wind-1')
var forecast1Humidity = document.getElementById('humidity-1');

var forecast2Date = document.getElementById('date-2');
var forecast2Symbol = document.getElementById('symbol-2');
var forecast2Temp = document.getElementById('temp-2');
var forecast2Wind = document.getElementById('wind-2')
var forecast2Humidity = document.getElementById('humidity-2');

var forecast3Date = document.getElementById('date-3');
var forecast3Symbol = document.getElementById('symbol-3');
var forecast3Temp = document.getElementById('temp-3');
var forecast3Wind = document.getElementById('wind-3')
var forecast3Humidity = document.getElementById('humidity-3');

var forecast4Date = document.getElementById('date-4');
var forecast4Symbol = document.getElementById('symbol-4');
var forecast4Temp = document.getElementById('temp-4');
var forecast4Wind = document.getElementById('wind-4')
var forecast4Humidity = document.getElementById('humidity-4');

var forecast5Date = document.getElementById('date-5');
var forecast5Symbol = document.getElementById('symbol-5');
var forecast5Temp = document.getElementById('temp-5');
var forecast5Wind = document.getElementById('wind-5')
var forecast5Humidity = document.getElementById('humidity-5');

var weatherApiKey = '503191814aab7688ab7d586c6bfbd8b6';
var geocodingURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';

var chosenCity = '';
var lat;
var lon;

var cityForecast = {}
var weatherToday = {}

// Checks to make sure a city was entered and begins to get the coordinates if so
function submitSearch(event) {
    event.preventDefault();
    chosenCity = userInput.value.trim();
    if (chosenCity === '') {
        alert('You must enter a city name to search the weather data of that city, try again.');
        location.reload();
    } else {
        console.log(chosenCity);
        localStorage.setItem('city', chosenCity);
        console.log(localStorage);
        getCoordinates();
    }
}

// Function to get coordinates from geocoding API based on user input
function getCoordinates() {
    var geocodeApiCall = geocodingURL + chosenCity + '&appid=' + weatherApiKey;

    fetch(geocodeApiCall)
    .then( function(response) {
        if (response.status !== 200) {
            alert(response.status + ' Error: The city was not found. There was either a typo, or it does not exist. Please try again.');
            location.reload();
        }
        return response.json();
    })
    .then( function(data) {
        lat = data.city.coord.lat;
        lon = data.city.coord.lon;
        getWeatherApi();
    })
}

// Function to call the weather api using coordinates passed from the getCoordinates() function
function getWeatherApi() {
    var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + weatherApiKey + '&units=imperial';
    var currentForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + weatherApiKey + '&units=imperial';

    fetch(currentWeatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        weatherToday = data;
        console.log('>>>> Weather Data >>>>', weatherToday);
    })

    fetch(currentForecastUrl)
    .then( function(response) {
        return response.json()
    })
    .then( function(data) {
        cityForecast = data;
        console.log('>>>> 5-Day Forecast >>>>', cityForecast);
        renderDataToPage();
    })
}

// Places the weather data for the selected city onto the page
function renderDataToPage() {
    var pngUrl = 'https://openweathermap.org/img/wn/';

    currentCityName.textContent = weatherToday.name;
    var currentCityIconCode = weatherToday.weather[0].icon;
    var currentCityIconUrl = pngUrl + currentCityIconCode + '@2x.png';
    currentCityIcon.src = currentCityIconUrl;
    currentCityTemp.textContent = 'Temp: ' + weatherToday.main.temp + ' °F';
    currentCityWind.textContent = 'Wind: ' + weatherToday.wind.speed + ' MPH';
    currentCityHumidity.textContent = 'Humidity: ' + weatherToday.main.humidity + ' %';

    var unixTime = cityForecast.list[4].dt;
    forecast1Date.textContent = unixConversion(unixTime);
    var day1IconCode = cityForecast.list[4].weather[0].icon;
    var day1IconUrl = pngUrl + day1IconCode + '@2x.png';
    forecast1Symbol.src = day1IconUrl;
    forecast1Temp.textContent = 'Temp: ' + cityForecast.list[4].main.temp + ' °F';
    forecast1Wind.textContent = 'Wind: ' + cityForecast.list[4].wind.speed + ' MPH';
    forecast1Humidity.textContent = 'Humidity: ' + cityForecast.list[4].main.humidity + ' %';

    unixTime = cityForecast.list[12].dt;
    forecast2Date.textContent = unixConversion(unixTime);
    var day2IconCode = cityForecast.list[12].weather[0].icon;
    var day2IconUrl = pngUrl + day2IconCode + '@2x.png';
    forecast2Symbol.src = day2IconUrl;
    forecast2Temp.textContent = 'Temp: ' + cityForecast.list[12].main.temp + ' °F';
    forecast2Wind.textContent = 'Wind: ' + cityForecast.list[12].wind.speed + ' MPH';
    forecast2Humidity.textContent = 'Humidity: ' + cityForecast.list[12].main.humidity + ' %';

    unixTime = cityForecast.list[20].dt;
    forecast3Date.textContent = unixConversion(unixTime);
    var day3IconCode = cityForecast.list[20].weather[0].icon;
    var day3IconUrl = pngUrl + day3IconCode + '@2x.png';
    forecast3Symbol.src = day3IconUrl;
    forecast3Temp.textContent = 'Temp: ' + cityForecast.list[20].main.temp + ' °F';
    forecast3Wind.textContent = 'Wind: ' + cityForecast.list[20].wind.speed + ' MPH';
    forecast3Humidity.textContent = 'Humidity: ' + cityForecast.list[20].main.humidity + ' %';

    unixTime = cityForecast.list[28].dt;
    forecast4Date.textContent = unixConversion(unixTime);
    var day4IconCode = cityForecast.list[28].weather[0].icon;
    var day4IconUrl = pngUrl + day4IconCode + '@2x.png';
    forecast4Symbol.src = day4IconUrl;
    forecast4Temp.textContent = 'Temp: ' + cityForecast.list[28].main.temp + ' °F';
    forecast4Wind.textContent = 'Wind: ' + cityForecast.list[28].wind.speed + ' MPH';
    forecast4Humidity.textContent = 'Humidity: ' + cityForecast.list[28].main.humidity + ' %';

    unixTime = cityForecast.list[36].dt;
    forecast5Date.textContent = unixConversion(unixTime);
    var day5IconCode = cityForecast.list[36].weather[0].icon;
    var day5IconUrl = pngUrl + day5IconCode + '@2x.png';
    forecast5Symbol.src = day5IconUrl;
    forecast5Temp.textContent = 'Temp: ' + cityForecast.list[36].main.temp + ' °F';
    forecast5Wind.textContent = 'Wind: ' + cityForecast.list[36].wind.speed + ' MPH';
    forecast5Humidity.textContent = 'Humidity: ' + cityForecast.list[36].main.humidity + ' %';
}

// Converts unix timestamp
// This function is passed in throughout the rendering to convert the unix timestamp into
// A date
function unixConversion(unixTime) {
    var date = new Date(unixTime * 1000);

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedDate = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
}

// Event listener to begin the search
searchButton.addEventListener('click', submitSearch);