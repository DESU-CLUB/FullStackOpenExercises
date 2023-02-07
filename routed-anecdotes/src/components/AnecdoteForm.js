import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"
const CreateNew = (props) => {
    const {reset:contentReset, ...content} = useField('text')
    const {reset:authorReset,...author} = useField('text')
    const {reset:infoReset,...info} = useField('text')
    const navigate = useNavigate()
  
    const resetAll = () =>{
      contentReset()
      authorReset()
      infoReset()
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
      props.setNotification(`A new anecdote ${content.value} created!`)
      setTimeout(() =>{props.setNotification('')},5000)
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input  {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type = 'submit'>create</button>
          <button type = 'button' onClick = {resetAll}>reset</button>
        </form>
        
      </div>
    )
  
  }

export default CreateNew