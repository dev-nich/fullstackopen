import Weather from "./Weather"
const Country = ({country, isShow}) => {
    return country ? 
        <div className={isShow ? 'show' : 'hide'}>
            <h1>{country.name.common}</h1>
            <div></div>
            <div>Capital {country.capital?.map(name=><div>{name}</div>)}</div>
            <div>Area {country.area}</div>
            <div></div>
            <h3>Languages</h3>
            <ul>
               {Object.values(country.languages).map(item=><li>{item}</li>)}
            </ul>
            <img src={country.flags.png} />
            <Weather capital={country.capital[0]} weatherData={country.weatherData} />
        </div> 
    : null
}

export default Country