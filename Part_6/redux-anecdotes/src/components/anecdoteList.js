import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updatingVote, initialiseAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(initialiseAnecdote())
    }, [dispatch])

    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.startsWith(state.filter)))
    console.log(anecdotes)
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote.content} vote={anecdote.votes} addVote={() => {
                    dispatch(updatingVote(anecdote,anecdote.id))
                    dispatch(setNotification(`${anecdote.content} given 1 vote`,5))
                }
            } />


            )}
        </div>
    )
}

const Anecdote = ({ anecdote, vote, addVote }) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {vote} votes <button onClick={addVote}>Vote</button></p>
        </div>
    )
}

export default AnecdoteList