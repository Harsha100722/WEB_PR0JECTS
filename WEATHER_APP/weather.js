async function getWeather() {
  const city = document.getElementById("text_input").value;
  const apikey = "a4214bc97cc6563d4922774a3ff7c624";

  if (!city) {
    document.getElementById("searchresult").innerHTML = `<p>Please enter a city name.</p>`;
    return; 
  }

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    if (data.cod != 200) {
      document.getElementById("searchresult").innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const iconcode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;

    document.getElementById("searchresult").innerHTML = `
      <div class="box1">
        <img src="${iconURL}" alt="${data.weather[0].description}">
        <span>${data.name}</span>
      </div>
      <div class="searchresult">
        <div class="box">
          <img src="/PROJECTS/WEATHER_APP/temp1.png" alt="">
          <span>Temperature: ${data.main.temp} °C</span>
        </div>
        <div class="box">
          <img src="/PROJECTS/WEATHER_APP/wind1.png" alt="">
          <span>Wind Speed: ${data.wind.speed} m/s</span>
        </div>
        <div class="box">
          <img src="/PROJECTS/WEATHER_APP/weather1.png" alt="">
          <span>Weather: ${data.weather[0].description}</span>
        </div>
      </div>
    `;
  } catch (error) {
    document.getElementById("searchresult").innerHTML = `<p>Error fetching data</p>`;
  }
}
