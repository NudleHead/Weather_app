function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${key}`;
            connectWithApi(api);
        })
    } else {
        alert('Something went wrong, please refresh website or change your browser.');
        return false;
    }
}

function connectWithApi(api) {

    fetch(api).then(response => {
        let data = response.json();
        return data;
    }).then(data => {
        console.log(data)
        let icon = data.weather[0].icon;
        if (icon.charAt(2) == 'n') {
            bodyElement.style.background = 'linear-gradient(#1c3a89, #0f1624)';
        } else if (icon.charAt(2) == 'd') {
            // bodyElement.style.color = '#1c3a89';
            bodyElement.style.background = "linear-gradient(#90e9f6, #005681)";
        }
        if (icon == '02d') {
            icon = 'PARTLY_CLOUDY_DAY';
        } else if (icon == '02n') {
            icon = 'PARTLY_CLOUDY_NIGHT';
        } else if (icon == '01d') {
            icon = 'CLEAR_DAY';
        } else if (icon == '01n') {
            icon = 'CLEAR_NIGHT';
        } else if (icon == '04d' || icon == '03n' || icon == '03d' || icon == '04n') {
            icon = 'CLOUDY';
        } else if (icon == '09d' || icon == '09n') {
            icon = 'SLEET';
        } else if (icon == '10d' || icon == '10n') {
            icon = 'RAIN';
        } else if (icon == '13d' || icon == '13n') {
            icon = 'SNOW';
        } else if (icon == '50d' || icon == '50n') {
            icon = 'FOG';
        }
        locationName.innerHTML = data.name;
        windElement.innerHTML = `~ ${data.wind.speed} mps`;
        degreeValue.innerHTML = `${data.main.temp.toFixed(0)}°<span>C</span>`;
        weather.description = data.weather[0].description;
        weatherDesctription.innerHTML = weather.description;
        setIcon(icon, document.querySelector('.icon'));
        setIcon('WIND', document.querySelector('.wind-icon'));
    })
}

function getCityName() {

    let cityValue = cityName.value;
    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&APPID=${key}`;
    connectWithApi(apiCity);

}

function setIcon(icon, iconID) {
    const skycons = new Skycons({
        color: 'white'
    });
    skycons.play();
    return skycons.set(iconID, Skycons[icon]);

}
const weather = {};

weather.temperature = {
    unit: "celsius"
}
const locationName = document.querySelector('h1.location-name');
const degreeValue = document.querySelector('.degree');
const weatherDesctription = document.querySelector('.temperature-desctription');
const bodyElement = document.querySelector('body');
const windElement = document.querySelector('.wind-value');
const key = 'bddac1135f4f461a171f09c1ed395fe1';
const searchButton = document.querySelector('.fas.fa-search-location');
let cityName = document.getElementById('search');
cityName.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        searchButton.click();
    }
})
searchButton.addEventListener('click', getCityName);
window.addEventListener('load', getLocation);