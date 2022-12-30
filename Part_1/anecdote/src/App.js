import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  const voteInit = anecdotes.map(values => 0) //maps same length arr with all values 0 to vote state
  const [selected, setSelected] = useState(0)
  const [vote,setVote] = useState(voteInit)
  
const randomiseIndex = () => {
    const random = Math.floor(Math.random()*anecdotes.length)
    setSelected(random)
}

const addVote = () =>{
  const newVotes = [...vote]
  newVotes[selected]+=1
  setVote(newVotes)
}

const maxVote = () =>{
  const max = Math.max(...vote)
  const isLargest = element => element === max
  const idx = vote.findIndex(isLargest)
  return({anecdote: anecdotes[idx], max})
  };


/*For finding all current max votes

const arr = []
const maxVote = () =>{
  const max = Math.max({...vote})
  for (i=0,i<vote.length,i++){
    if (max === vote[i]){
      arr = arr.concat(i)
    }
  }
}
highlights = []
arr.forEach((value,index) =>
{highlights.concat(<Highlight anecdote = {anecdote[value]} votes = {vote[value]}/>
})
  

  then in App component return:
    {highlights} instead of <Highlight..../>
    
    

*/

const {anecdote,max} = maxVote()



  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <br/>
      <button onClick = {addVote}>Vote</button>
      <button onClick = {randomiseIndex}>Next Anecdote</button>
      <Highlight anecdote = {anecdote} votes = {max}/>
    </div>
  )
}

const Highlight = (props) =>{
  if (props.votes === 0){
    return(
      <p>Anecdote with most votes will be shown here</p>
    )
  }
  return(
    <div>
    <h1>Anecdote with most votes</h1>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
    </div>
  )
}
export default App