import React, { useState, useEffect} from "react";
import Spinner from './visual/Spinner';
import Climate from "./visual/Climate";


const SearchW = () => {
    const [search, setSearch] = useState ("new york");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a27720884faabbf5843fd73399c86e3f`);
            setData(await response.json());
            setLoading(false);
        }

        fetchWeather();
        
    }, [search]);

    const changeValue = (newInput) => {
        const newCity = newInput;
        setSearch(newCity);
    }

    return(
        <div>
           {loading ? <Spinner /> : <Climate changeValue={changeValue} data={data} /> }
        </div>
    )
}

export default SearchW;