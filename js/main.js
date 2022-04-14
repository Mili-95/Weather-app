//date time year
    let formattedDate = setInterval(function(){

    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","Auguest","September","October","November","December"];

    //hour & minutes
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let todayDate = date.getDate();
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();


    if (hours < 0) {
        hours = hours * -1;
    } else if (hours == 00) {
        hours = 12;
    } else {
        hours = hours;
    }
    //display time hour & minute
    let currentTime = `${hours}:${minutes}`;
    let dateTimeElement = document.querySelector(".current-time-date");
    dateTimeElement.innerText = `${day}, ${todayDate} ${month} ${year} | Local time: ${currentTime}`;
    let formattedDate = `${day}, ${todayDate} ${month} ${year} | Local time: ${currentTime}`;

    return formattedDate;

    },1000);

    //display hour forcast

    function formatHours(timeHour){
        let time = new Date(timeHour);
        let hour = (12 -(time.getHours()));
        if(hour < 10){
            hour = `0${hour}`;
        } 

        let minute = time.getMinutes();
        if(minute < 10){
            minute = `0${minute}`;
        }
        return `${hour}:${minute}`;

    }

    //display temp, city, wind

    function showTemperature(response){
        let temperature = response.data.main.temp;
        document.querySelector(".temp").innerHTML = Math.round(temperature) + "° ";
        let humidity = response.data.main.humidity;
        let wind = response.data.wind.speed;
        let city = response.data.name;
        let realFeel = response.data.main.feels_like;
        
        document.querySelector(".current-weather-description").innerHTML = response.data.weather[0].description;
        let iconElement = document.querySelector(".icon");
        iconElement.setAttribute(
            "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
        iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
        let windUnit = "m/s";
        let humidityUnit = "%";
        document.querySelector(".real-feel").innerHTML = "Real feel :" + " " + `${realFeel}` + "°";
        document.querySelector(".city-name").innerHTML = city;
        document.querySelector(".wind").innerHTML = "Wind :" + " " +  `${wind}${windUnit}`;
        document.querySelector(".humidity").innerHTML = "Humidity :" + "" + `${humidity}${humidityUnit}`;
        celsiusTemp = response.data.main.temp;
    }

    //dislplay hours weather list
    function showForeCast(response) {
        console.log(response.data);
        let forecastElement = document.querySelector(".hour-list");
        forecastElement.innerHTML = null;
        let forecast = null;
        for(let index = 0; index < 6; index++) {
            forecast = response.data.list[index];
            forecastElement.innerHTML += `<div class="hour-box"> 
            ${formatHours(forecast.dt * 1000)}
            <div class="hour-icon">
                <img src="https://openweathermap.org/img/wn/${
                    forecast.weather[0].icon
                  }@2x.png" alt="" width="30px" height="30px">
            </div>
            <div class="temp-forcast">
                <strong>${Math.round(forecast.main.temp_max)}℃</strong>
            </div>

        </div>`;
        }
    }

    //api unit and kyes
    function weather(city) {
        let apiKey = "5c3ee28f0359086dde5610bde74e2870";
        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
        let fullUrl = `${apiUrl}${city}&units=metric&appid=${apiKey}`;
        axios.get(fullUrl).then(showTemperature);
        fullUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(fullUrl).then(showForeCast);
    }

    //put value search input
    function displayCity(event){
        event.preventDefault();
        let city = document.querySelector(".search").value;
        celsius.classList.add("active");
        fahrenheit.classList.remove("active");

        weather(city);

    }

    //event searchcity
    let searchCity = document.querySelector("#search-btn");
    searchCity.addEventListener("click", displayCity);


    //geolocation apiKey url
    function ShowPosition(position){
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "5c3ee28f0359086dde5610bde74e2870";
        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
        let units = "metric";
        let fullUrl = `${apiUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        axios.get(fullUrl).then(showTemperature);
        fullUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        axios.get(fullUrl).then(showForeCast);
        celsius.classList.add("active");
        fahrenheit.classList.remove("active");
    }

    //geolocation constructor passed
    function getCurrentLocation(event){
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(ShowPosition);

    }
    //geolocation event
    let locationButton = document.querySelector("#location-btn");
    locationButton.addEventListener("click", getCurrentLocation);

    //convert to fahrenheit
    function convertToFahrenheit(event) {
        event.preventDefault();
        let temp = document.querySelector(".temp");
        celsius.classList.add("active");
        fahrenheit.classList.remove("active");
        let tempFaren = celsiusTemp * 1.8 + 32;
        temp.innerHTML = Math.round(tempFaren);

    }

    let celsiusTemp = null;

    //convert to celsius
    function convertToCelsius(event){
        event.preventDefault();
        let temp = document.querySelector(".temp");
        celsius.classList.add("active");
        fahrenheit.classList.remove("active");
        temp.innerHTML = Math.round(celsiusTemp);
    }

    //farenheit and celsiud event function
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", convertToFahrenheit);
    let celsius = document.querySelector("#celcius");
    celsius.addEventListener("click", convertToCelsius);

        
    weather("Kolkata");

    