import React, { useState, useEffect} from "react";
import './SearchW.css';

const SearchW = () => {
    const [search, setSearch] = useState ("new york");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [component, setComponent] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a27720884faabbf5843fd73399c86e3f`);
            if(component) setData(await response.json());
            return () => setComponent(false);
        }
        fetchWeather();
    }, [search]);

    let emoji = null;
    if (typeof data.main != "undefined") {
        if(data.weather[0].main == "Thunderstorm" && data.weather[0].main == "Rain") {
            emoji = "fa-cloud-rain";
        } else {
            emoji = "fa-cloud";
        }
    } else {
        return (
            <div>Loading....</div>
        )
    }

    //temperature

    let temperature = (data.main.temp - 273.15).toFixed(2);
    let min_temp = (data.main.temp_min - 273.15).toFixed(2);
    let max_temp = (data.main.temp_max - 273.15).toFixed(2);

    //date

    let d = new Date();
    let date = d.getDate();
    let day = d.toLocaleString("default", {weekday: 'long'});
    let month = d.toLocaleString("default", {month: 'long'})
    let year = d.getFullYear();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSearch(input);
    }

    return(
        <div>
           <div className="search">
               <div className="display">
                    <form onSubmit={handleSubmit}>
                        <div className="search__imput">
                            <input type="search" className="searcher" placeholder="Search City" name="search" value={input} onChange={(e) => setInput(e.target.value)} required />
                            <button type="submit" className="searcher">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </form>
                    <div className="search__text">
                        <h2 className="search__title">{data.name}</h2>
                        <p className="search__date">{day}, {month} {date}, {year}</p>
                        <hr />
                        <i className={`fas ${emoji} fa-4x`} />
                        <h1 className="search__actual-weather">{temperature} &deg;C</h1>
                        <p className="search__cloud">{data.weather[0].main}</p>
                        <p className="search__weather">{min_temp}&deg;C | {max_temp}&deg;C</p>
                    </div>
               </div>
           </div>
        </div>
    )
}

export default SearchW;