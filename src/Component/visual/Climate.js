import React, {useState} from "react";
import './Climate.css';
import { times } from './../Dates';

const Climate = ({data, changeValue}) => {
    const [input, setInput] = useState("");

    let temperature = (data.main.temp - 273.15).toFixed(2);
    let min_temp = (data.main.temp_min - 273.15).toFixed(2);
    let max_temp = (data.main.temp_max - 273.15).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();

        changeValue(input);
    }

    return(
        <div>
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
                        <p className="search__date">{times.day}, {times.month} {times.date}, {times.year}</p>
                        <hr />
                        <i className={`fas fa-cloud fa-4x`} />
                        <h1 className="search__actual-weather">{temperature} &deg;C</h1>
                        <p className="search__cloud">{data.weather[0].main}</p>
                        <p className="search__weather">{min_temp}&deg;C | {max_temp}&deg;C</p>
                    </div>
               </div>
        </div>
    )
}

export default Climate;