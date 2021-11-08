import React, { useState } from "react";
const api = {
  key: "2388a54016e2fb54e14677c936b7c423",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    e.preventDefault()
    if (query === '') {
      console.log('err')
    } else {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  };

  window.onload = function(){
    fetch(`${api.base}weather?q=kyiv&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
    });
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='app'>
      <main>
        <form className="search-box" >
          <input 
            type="text" 
            className="search-bar"
            placeholder="City..."
            onChange={e => setQuery(e.target.value)}
            value={query} 
          />
          <button className="search-button" onClick={search}>Search</button>
        </form>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country} {}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
       </main>
    </div>
  );


}

export default App;
