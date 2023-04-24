var searchButton = document.getElementById('search-button');
var userInput = document.getElementsByClassName('user-input');

var weatherApi = '503191814aab7688ab7d586c6bfbd8b6';

function convertUserInput(event) {
    event.preventDefault();
    getWeatherApi();
}

// Function to call the weather api
function getWeatherApi() {
    // lat and lon given placeholders for now
    var lat = 42.652843
    var lon = -73.757874
    var currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + weatherApi;

    fetch(currentWeatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

searchButton.addEventListener('click', convertUserInput);