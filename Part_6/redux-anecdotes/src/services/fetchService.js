import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll =  async () =>{
    const anecdotes = await axios.get(baseUrl)
    return anecdotes.data
}

const createAnecdote = async (data) =>{
    const newAnecdote = {content:data, votes: 0}
    const anecdote = await axios.post(baseUrl,newAnecdote)
    console.log(anecdote)
    return anecdote.data
}

const updateVote = async (data,id) =>{
    const anecdoteToUpdate = {...data,vote: data.vote+1}
    await axios.put(`${baseUrl}/${id}`,anecdoteToUpdate)
}

const helper = {getAll,createAnecdote,updateVote}
export default helper;