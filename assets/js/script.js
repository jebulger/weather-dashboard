var searchButton = document.getElementById('search-button');
var userInput = document.getElementById('user-input')
var previousSearches = document.getElementById('search-history');

// Id selectors for the elements of the current weather card
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

// Rendering search history upon page load 
historyToList();

// This function grabs the search history and appends them as clickable buttons onto the page
// Upon loading the page this function is called and will list any previous searches
// Upon clicking one of the search buttons, the textcontent of the button clicked is then
// used to perform an alternative search
function historyToList() {
    var loadedSearchHistory = localStorage.getItem('city');
    // Removing the child buttons each time this is called to prevent
    // the list from compounding, then reappending 
    while (previousSearches.firstChild) {
        previousSearches.removeChild(previousSearches.firstChild);
    }
    if (loadedSearchHistory) {
        loadedSearchHistory = JSON.parse(loadedSearchHistory);
        console.log(loadedSearchHistory);
    } else {
        loadedSearchHistory = [];
    }
    if (loadedSearchHistory.length > 0) {
        for (var i = 0; i < loadedSearchHistory.length; i++) {
            var historyButton = document.createElement('button');
            previousSearches.appendChild(historyButton);
            historyButton.textContent = loadedSearchHistory[i];
            historyButton.addEventListener('click', function (event) {
                var searchValue = event.target.textContent;
                altSearch(searchValue);
            });
        }
    }
}

// Function to perform an alternate search when the search history buttons are selected
// Skips over the submit search and
function altSearch(searchValue) {
    console.log(searchValue);
    chosenCity = searchValue;
    getCoordinates();
}

// Checks to make sure a city was entered and begins to get the coordinates if so
function submitSearch(event) {
    event.preventDefault();
    chosenCity = userInput.value.trim();
    if (chosenCity === '') {
        alert('You must enter a city name to search the weather data of that city, try again.');
        location.reload();
    } else {
        console.log(chosenCity);
        var searchHistory = localStorage.getItem('city');
        if (searchHistory) {
            searchHistory = JSON.parse(searchHistory);
        } else {
            searchHistory = [];
        }
        searchHistory.push(chosenCity);
        localStorage.setItem('city', JSON.stringify(searchHistory));
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
    
    var unixTime = weatherToday.dt;
    currentCityName.textContent = weatherToday.name;
    currentCityName.textContent = currentCityName.textContent.concat(' (' + unixConversion(unixTime) + ')');
    var currentCityIconCode = weatherToday.weather[0].icon;
    var currentCityIconUrl = pngUrl + currentCityIconCode + '@2x.png';
    currentCityIcon.src = currentCityIconUrl;
    currentCityTemp.textContent = 'Temp: ' + weatherToday.main.temp + ' °F';
    currentCityWind.textContent = 'Wind: ' + weatherToday.wind.speed + ' MPH';
    currentCityHumidity.textContent = 'Humidity: ' + weatherToday.main.humidity + ' %';

    unixTime = cityForecast.list[6].dt;
    forecast1Date.textContent = unixConversion(unixTime);
    var day1IconCode = cityForecast.list[6].weather[0].icon;
    var day1IconUrl = pngUrl + day1IconCode + '@2x.png';
    forecast1Symbol.src = day1IconUrl;
    forecast1Temp.textContent = 'Temp: ' + cityForecast.list[6].main.temp + ' °F';
    forecast1Wind.textContent = 'Wind: ' + cityForecast.list[6].wind.speed + ' MPH';
    forecast1Humidity.textContent = 'Humidity: ' + cityForecast.list[6].main.humidity + ' %';

    unixTime = cityForecast.list[14].dt;
    forecast2Date.textContent = unixConversion(unixTime);
    var day2IconCode = cityForecast.list[14].weather[0].icon;
    var day2IconUrl = pngUrl + day2IconCode + '@2x.png';
    forecast2Symbol.src = day2IconUrl;
    forecast2Temp.textContent = 'Temp: ' + cityForecast.list[14].main.temp + ' °F';
    forecast2Wind.textContent = 'Wind: ' + cityForecast.list[14].wind.speed + ' MPH';
    forecast2Humidity.textContent = 'Humidity: ' + cityForecast.list[14].main.humidity + ' %';

    unixTime = cityForecast.list[22].dt;
    forecast3Date.textContent = unixConversion(unixTime);
    var day3IconCode = cityForecast.list[22].weather[0].icon;
    var day3IconUrl = pngUrl + day3IconCode + '@2x.png';
    forecast3Symbol.src = day3IconUrl;
    forecast3Temp.textContent = 'Temp: ' + cityForecast.list[22].main.temp + ' °F';
    forecast3Wind.textContent = 'Wind: ' + cityForecast.list[22].wind.speed + ' MPH';
    forecast3Humidity.textContent = 'Humidity: ' + cityForecast.list[22].main.humidity + ' %';

    unixTime = cityForecast.list[30].dt;
    forecast4Date.textContent = unixConversion(unixTime);
    var day4IconCode = cityForecast.list[30].weather[0].icon;
    var day4IconUrl = pngUrl + day4IconCode + '@2x.png';
    forecast4Symbol.src = day4IconUrl;
    forecast4Temp.textContent = 'Temp: ' + cityForecast.list[30].main.temp + ' °F';
    forecast4Wind.textContent = 'Wind: ' + cityForecast.list[30].wind.speed + ' MPH';
    forecast4Humidity.textContent = 'Humidity: ' + cityForecast.list[30].main.humidity + ' %';

    unixTime = cityForecast.list[38].dt;
    forecast5Date.textContent = unixConversion(unixTime);
    var day5IconCode = cityForecast.list[38].weather[0].icon;
    var day5IconUrl = pngUrl + day5IconCode + '@2x.png';
    forecast5Symbol.src = day5IconUrl;
    forecast5Temp.textContent = 'Temp: ' + cityForecast.list[38].main.temp + ' °F';
    forecast5Wind.textContent = 'Wind: ' + cityForecast.list[38].wind.speed + ' MPH';
    forecast5Humidity.textContent = 'Humidity: ' + cityForecast.list[38].main.humidity + ' %';
    historyToList();
}

// Converts unix timestamp
// This function is passed in throughout the rendering to convert the unix timestamp into
// a date
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