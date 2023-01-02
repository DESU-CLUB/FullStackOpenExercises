import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [countries,setCountries] = useState([])
  const [name,setName] = useState('')
  
  const effect = () =>{
    axios
    .get(
      'https://restcountries.com/v2/name/'+name,
      {validateStatus: function(status){
        return status<500
      }})
    .then(response =>{
      if (response.status === 200){
        console.log(response.data)
        setCountries(response.data)
      }
      else{
        console.log('Bad request')
      }
      
    })
  }

 

      
  
  useEffect(effect,[name])
  return (
    <>
    <h1>Search for countries</h1>
    <p>Country: 
      <input value = {name} onChange = {(e)=>{
        setName(e.target.value)
        }}/>
    </p>
    <Countries countries = {countries}/>
    
    </>
  );
}


const Countries = ({countries}) =>{
  const date = new Date()
  const year = date.toLocaleString('default',{year:'numeric'})
  const month = date.toLocaleString('default',{month:'2-digit'})
  const day = date.toLocaleString('default',{day:'2-digit'})
  const formattedDate = year+'-'+month+'-'+day
  if (countries.length>10){
    return(
      <p>Too many countries</p>
    )
  }
  else{
    let specified = false
    if (countries.length === 1){
      specified = true
    }
    return(
      <div>
      {countries.map((element,index) =>
      <Country key = {[element.alpha2Code,specified]} country = {element} spec = {specified} date = {formattedDate}/>
      )}
      </div>
    )
  }
}

const Country = ({country,spec,date}) =>{
  
    const [specified,setSpecified] = useState(spec)
    const [temp,setTemp] = useState('')
    const [wind,setWind] = useState('')
    const [weather,setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const key = 'key='+api_key+'&'
    const q = 'q='+country.capital
    let arr= []    
  
    const effect = ()=>{
      axios
      .get('http://api.weatherapi.com/v1/forecast.json?'+key+q)
      .then(response =>
          {console.log(response.data)
          setTemp(response.data.current.temp_c+'°C')
          setWind( response.data.current.wind_kph+'kph')
          setWeather(response.data.current.condition.icon)
          
          
        })
    }

    useEffect(effect,[])

   //Instead of passing prop to useState, we update specified based on whether the props changes

  /*Example: Palestine appears first with multiple countries, so spec is false at first
  
  if we init our state with the prop, once palestine becomes the only country in the list,
  useState doesnt reinitialise with changed prop

  in order to combat this, we use UseEffect, which changes the state to the props value whenever props value is changed
  
  HOWEVER, preferred way of solving it is to put prop that changes in key prop
  this is as when key prop is updated, all states are reinitialised.
  
  */
  //

  const toggleFullView = () =>{
    setSpecified(!specified)
  }
  
  
  if (specified === false){
  return(
    <p>{country.name} <button onClick = {toggleFullView}>{specified?'Hide':'Show'}</button></p>
  )
  } 
  else{
    return(
      <>
      <h1>{country.name} <button onClick = {toggleFullView}>{specified?'Hide':'Show'}</button></h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <strong>Languages</strong>
      <ul>
      {country.languages.map(language => <Language key = {language.iso639_2} name  = {language.name}/>)}
      </ul>
      <img src = {country.flags.png}/>
      <h2>Weather</h2>
      <Weather text = 'Weather' data = {weather}/>
      <Weather text = 'Temperature' data = {temp}/>
      <Weather text = 'Wind' data = {wind}/>
      {arr}


      </>
    )
  }
}

const Weather = ({text,data}) =>{
  if (text === 'Weather'){
    return <img src = {data}/>
  }
  else{
    return <p>{text}: {data}</p>
  }
}



const Language =({name}) =>{
  return(
    <li>{name}</li>
  )
}

export default App;
