import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route,Link, useMatch
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/AnecdoteForm'
import Anecdote from './components/Anecdote'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to = '/' style={padding}>anecdotes</Link>
      <Link to = '/create' style={padding}>create new</Link>
      <Link to = '/about' style={padding}>about</Link>
    </div>
  )
}





const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const matcher = useMatch('/:id')

  const anecdote = matcher? anecdotes.find(anecdote => anecdote.id === Number(matcher.params.id)): null
  console.log(matcher,anecdote)
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
   
    <div>
      <h1>Software anecdotes</h1>
      <p style = {{border:'2px solid red', display: notification===''?'none':''}}>{notification}</p>
      <Menu />
      <Routes>
      <Route path = '/' element = {<AnecdoteList anecdotes={anecdotes}/>} />
      <Route path = '/about' element = {<About />}/>
      <Route path = '/create' element = {<CreateNew addNew={addNew} setNotification = {setNotification} />}/>
      <Route path = '/:id' element = {<Anecdote anecdote = {anecdote}/>}/>
      </Routes>
      <Footer />
    </div>
 
  )
}

export default App
