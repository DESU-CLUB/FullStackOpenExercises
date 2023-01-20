import { useState } from 'react'
const Noteform = ({ setMsg,setIsError,postBlog }) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')


  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title:title,
      author: author,
      url:url
    }
    await postBlog(newBlog)
    setMsg(`${title} has been posted by ${author}`)
    setIsError(false)
    setTimeout(() => {setMsg('')},5000)
    setAuthor('')
    setUrl('')
    setTitle('')
  }


  return(
    <form onSubmit = {addBlog}>
      <h1>Create New</h1>
      <p>Title
        <input id = 'title' name = "Title" value = {title} placeholder = 'title' onChange = {({ target }) => setTitle(target.value)}/>
      </p>
      <p>
            Author
        <input id = 'name' name = "author" value = {author} placeholder = 'author' onChange = {({ target }) => setAuthor(target.value)}/>
      </p>
      <p>
            URL
        <input id= 'url' name = "url" value = {url} placeholder = 'url' onChange={({ target }) => setUrl(target.value)}/>
      </p>
      <button id = 'blogSubmit' type = 'submit'>Create</button>
    </form>
  )
}

export default Noteform