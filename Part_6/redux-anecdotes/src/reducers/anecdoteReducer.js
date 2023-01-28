import { createSlice } from "@reduxjs/toolkit"
import helper from '../services/fetchService'


const initialState = []

const sortVotes = (state) => {
  console.log(state)
  return state.sort((a, b) => a.votes < b.votes)
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdote = state.find(element => element.id === id)
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return sortVotes(state.map(element => element.id === id ? changedAnecdote : element))
    },
    addAnecdote(state, action) {
      console.log(state)
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },

    setAnecdotes(state, action) {
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initialiseAnecdote = () => {
  return async dispatch => {
    const anecdotes = await helper.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
    return anecdotes

  }
}

export const creatingAnecdote = (data) =>{
  return async dispatch => {
    const anecdote = await helper.createAnecdote(data)
    dispatch(addAnecdote(anecdote))
  }
}

export const updatingVote = (data,id) =>{
  return async dispatch =>{
    
    await helper.updateVote(data,id)
    dispatch(addVote(id))
  }
}