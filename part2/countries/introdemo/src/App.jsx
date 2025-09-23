import {useState, useEffect} from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Country from './components/Country'
import './index.css'

const App = () => {
    const [search, setSearch] = useState('')
    const [country, setCountry] = useState(null)
    const [countryList, setCountryList] = useState([])
    const [message, setMessage] = useState('')


    const onChange = (event) => {
        setSearch(event.target.value)
        setMessage('')
        setCountryList([])
        setCountry(null)

        countryService
        .getAll()
        .then((data)=>{
            return data.filter(
                item => (
                    item.name.common.toLowerCase()).includes(event.target.value.toLowerCase()
                )
            )})
        .then((data)=>{
            if(data.length === 1){
                countryService
                .getOne(encodeURIComponent(data[0].name.common))
                .then((data)=> {
                    weatherService.getWeather(data.latlng).then((weatherData)=>{
                        const newCountry = {...data, weatherData:weatherData}
                        setCountry(newCountry)
                    })
                })
            }else if (data.length > 1 && data.length <= 10){
                const newData = data.map((item) => ({...item, isShow:false }))
                setCountryList(newData)    
            }else if (event.target.value.length === 0){
                setMessage('')
            }else{
                setMessage('Too many matches, specify another filter')
            }
        })
    }

    const showCountry = (event) => {
        const data = event.target.dataset;
        const newData = countryList.map(
            (item) => {
                const newItem = item;
                if(item.cca3 === data.id){
                    newItem.isShow = !newItem.isShow
                }
                return newItem
            })
        setCountryList(newData)
    }

    return <div>
        Find countries
        <input type="text" value={search} onChange={onChange} />
        <div>{message}</div>
        <ul>{countryList.map(item=>
            <li id={item.cca3}>
                {item.name.common}
                    <Country country={item} isShow={item.isShow} />
                <button data-id={item.cca3} onClick={showCountry}>{item.isShow ? 'Hide' : 'Show'}</button>
            </li>
        )}</ul>
        <Country country={country} isShow={true}/>
    </div>
}

export default App