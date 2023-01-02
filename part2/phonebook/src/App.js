import {useState} from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  

  const submitName = (event) =>{
    event.preventDefault()
    if (newName === '' || newNumber === ''){
      alert('One or more fields left blank')
    }
    else if (persons.some(element => element.name === newName || element.phoneNumber === newNumber)){
      alert(newName+' already registered!')
    }
    else{
      setPersons(persons.concat({name: newName, phoneNumber: newNumber}))
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
    {filtered.map(value => <Entry key = {value.name} name =  {value.name} number ={value.phoneNumber}/>)}
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
