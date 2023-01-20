import { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogs'

const LoginForm = ({ setUser,setMsg, setIsError }) => {
  const [password,setPass] = useState('')
  const [username,setUsername] = useState('')

  const submitForm = async (event) => {
    event.preventDefault()
    try{
      const signIn = await loginService.login({ username,password })
      setUsername('')
      setPass('')
      setUser(signIn.data.username)
      console.log(signIn)
      setMsg(`${signIn.data.username} signed in`)
      setIsError(false)
      setTimeout(() => {setMsg('')},5000)


      blogService.setToken(signIn.data.token)
      window.localStorage.setItem('loggedUser',JSON.stringify(signIn.data))
    }
    catch(exception){
      console.log(exception)
      setMsg('Invalid name/password')
      setIsError(true)
      setTimeout(() => {setMsg('')},5000)
    }


  }

  return(
    <form className = 'login' onSubmit = {submitForm}>
      <p>Name
        <input id = 'username'type = 'text' value = {username} name = "Username" onChange = {({ target }) => {setUsername(target.value)}}></input>
      </p>
      <p>Password
        <input id = 'password' type = 'password' value= {password} name= 'Password' onChange={({ target }) => {setPass(target.value)}}></input>
      </p>
      <button id = 'loginbutton' type = 'submit'>Login</button>
    </form>
  )
}

export default LoginForm