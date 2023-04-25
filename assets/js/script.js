var searchButton = document.getElementById('search-button');
var userInput = document.getElementById('user-input')

var weatherApiKey = '503191814aab7688ab7d586c6bfbd8b6';
var geocodingURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';

var chosenCity = '';
var lat;
var lon;

// Checks to make sure a city was entered and begins to get the coordinates if so
function submitSearch(event) {
    event.preventDefault();
    chosenCity = userInput.value.trim();
    if (chosenCity === '') {
        alert('You must enter a city name to search the weather data of that city, try again.');
        location.reload();
    } else {
        console.log(chosenCity);
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

    fetch(currentWeatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

// Event listener to begin the search
searchButton.addEventListener('click', submitSearch);