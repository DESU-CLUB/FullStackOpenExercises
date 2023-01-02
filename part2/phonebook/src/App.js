import {useState,useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
useEffect(
() =>{
console.log('effect')
axios.get('http://localhost:3001/persons')
.then(response =>{
  console.log(response.data)
  setPersons(response.data)
  
  })
},[])
  

  const submitName = (event) =>{
    event.preventDefault()
    if (newName === '' || newNumber === ''){
      alert('One or more fields left blank')
    }
    else if (persons.some(element => element.name === newName || element.phoneNumber === newNumber)){
      alert(newName+' already registered!')
    }
    else{
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName('')
      setNewNumber('')

    }
  }
  const filtered = persons.filter(element=> element.name.toLowerCase().includes(newFilter.toLowerCase(),0))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {newFilter} setNewFilter = {setNewFilter}/>
      <h2>Add a new</h2>
      <Form newName = {newName} newNumber = {newNumber} setNewName = {setNewName} setNewNumber = {setNewNumber} submitName = {submitName}/>
      <Entries filtered = {filtered}/>
    </div>
  )
}

const Entries = ({filtered}) =>{
  return(
    <div>
    <h2>Numbers</h2>
    {filtered.map(value => <Entry key = {value.name} name =  {value.name} number ={value.number}/>)}
    </div>
  )
}

const Filter = ({value,setNewFilter})=>{
  return(
    <div>
    <input value = {value} onChange = {(e)=>{setNewFilter(e.target.value)}}/>
    </div>
  )
}

const Entry =({name,number}) =>{
  return (
    <p>{name} {number}</p>
  )
}

const Form = (props) =>{
  return(
  <form onSubmit = {props.submitName}>
        <div>
          name: <input value = {props.newName} onChange = {e=>props.setNewName(e.target.value)}/>
        </div>
        <div>
          phone number: <input value = {props.newNumber} onChange = {e => {props.setNewNumber(e.target.value)}}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
  );
}

export default App;
