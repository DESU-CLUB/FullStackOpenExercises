import {useState,useEffect} from 'react'
import numberService from './services/numbers'
import Notification from './services/notification'

const App = () => {
  const [persons,setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [messageType,setMessageType] = useState(true)

  useEffect(
  () =>{
  numberService.getAll()
  .then(response =>{
  setPersons(response)
    })
  .catch(err => alert('Error!'))
  },[])

  const deleteItem = (id) =>{
    console.log(`Item with id of ${id} to be deleted`)
    numberService.del(id)
    .then(response => {
      setPersons(persons.filter(value => value.id !== id))
  })
    .catch(error=>{
      error = persons.find(value => value.id === id)
      setMessageType(true)
      setMessage(`Information of ${error.name} does not exist`)
      setTimeout(()=>{setMessage(null)},5000)
      setPersons(persons.filter(value => value.id !== id))
      console.log(persons)
    })
  }

  const submitName = (event) =>{
    event.preventDefault()
    if (newName === '' || newNumber === ''){
      alert('One or more fields left blank')
    }
    else if (persons.some(element => element.number === newNumber)){
      alert(`Number ${newNumber} already exists.`)
    }
    else if (persons.some(element => element.name === newName)){
      if (window.confirm(newName+' already registered!Would you like to update his/her number?')){
        const person = persons.find(element => element.name === newName)
        const changedPerson = {...person, number:newNumber}
        console.log(changedPerson)
        numberService.update(changedPerson.id,changedPerson)
        .then(response=>{
          setPersons(persons.map(p => p.name!==newName?p:response))
          setNewName('')
          setNewNumber ('')
        })
        .catch(
          err=> {
            setMessageType(true)
            setMessage(`Information of ${changedPerson.name} does not exist`)
            setTimeout(()=>{setMessage(null)},5000)})
      }
    }
    else{
      numberService.create({name:newName,number:newNumber})
      .then(response =>{
        console.log(response)
        setMessageType(false)
        setMessage(`Information of ${newName} added`)
        setTimeout(()=>{setMessage(null)},5000)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber ('')
      })
      .catch(err =>{alert('Error!')})
    }
  }
  const filtered = persons.filter(element=> element.name.toLowerCase().includes(newFilter.toLowerCase(),0))
  console.log(filtered)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {newFilter} setNewFilter = {setNewFilter}/>
      <h2>Add a new</h2>
      <Form newName = {newName} newNumber = {newNumber} setNewName = {setNewName} setNewNumber = {setNewNumber} submitName = {submitName}/>
      <Notification message = {message} error = {messageType}/>
      <Entries filtered = {filtered} deleteItem = {deleteItem}/>
    </div>
  )
}

const Entries = ({filtered,deleteItem}) =>{
  return(
    <div>
    <h2>Numbers</h2>
    {filtered.map(value => <Entry key = {value.id} value = {value} deleteItem = {deleteItem}/>)}
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

const Entry =({value,deleteItem}) =>{
  const {id,name,number} = value
  return (
    <p>{name} {number} <button onClick = {() => deleteItem(id)}>Delete</button></p>
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
