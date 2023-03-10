import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App