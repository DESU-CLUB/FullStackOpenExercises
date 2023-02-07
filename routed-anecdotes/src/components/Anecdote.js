const Anecdote = ({anecdote}) =>{
  const styled= {
  background: 'none!important',
  border: 'none',
  padding: '0!important',
  /*optional*/
  fontFamily: 'arial, sans-serif',
  fontSize: '18px',
  /*input has OS specific font-family*/
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer'
  }
  return(
  <div>
  <h2>{anecdote.content} by {anecdote.author}</h2>
  <p>has {anecdote.votes} votes</p>
  <p>For more info see <button style = {styled}>{anecdote.info}</button></p>
  </div>
)}

export default Anecdote
