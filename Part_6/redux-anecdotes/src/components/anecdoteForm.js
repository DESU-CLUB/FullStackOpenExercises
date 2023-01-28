import { connect } from 'react-redux'
import { creatingAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/messageReducer'
const AnecdoteForm = (props) => {

    const createAnecdote = async (e) => {
        e.preventDefault()
        const data = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.creatingAnecdote(data)
        props.setNotification(`${data} has been added`,5)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name='anecdote' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch =>{
    return {
        creatingAnecdote: anecdote =>{
            dispatch(creatingAnecdote(anecdote))
        },
        setNotification: (message,time) =>{
            dispatch(setNotification(message,time))
        }
    }
}

export default connect(null,mapDispatchToProps)(AnecdoteForm)