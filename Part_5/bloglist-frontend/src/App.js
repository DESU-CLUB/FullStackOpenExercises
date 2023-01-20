import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/login'
import Noteform from './components/NoteForm'
import Notification from './components/notification'
import blogService from './services/blogs'
import Toggleable from './components/Toggleable'
import Details from './Details'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msg,setMsg] = useState('')
  const [isError,setIsError] = useState(true) //true means error


  const sortBlogs = (blogs) => {
    return blogs.sort((a,b) => (a.likes > b.likes)?0:1 )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( sortBlogs(blogs) )
    )
  }, [])



  useEffect(() => {
    const logged = localStorage.getItem('loggedUser')
    if ( logged !== null && logged !== undefined){
      const parseLogged = JSON.parse(logged)
      setUser(parseLogged.username)
      blogService.setToken(parseLogged.token)
    }
  },[])

  const postBlog = async (newBlog) => {
    try{
      blogFormRef.current()
      const response = await blogService.postBlog(newBlog)
      console.log(response)
      setBlogs(blogs.concat(response))

    }
    catch(exception){
      console.log(exception)
      if (exception.response.status === 400){
        setMsg('Fields left blank')
        setIsError(true)
        setTimeout(() => {setMsg('')},5000)
      }
      else if (exception.response.status === 401){
        setMsg('Unauthorised user')
        setIsError(true)
        setTimeout(() => {setMsg('')},5000)
      }
    }
  }
  const blogFormRef = useRef(null)

  const noteform = () => (
    <Toggleable buttonLabel = 'Show form' ref ={blogFormRef}>
      <Noteform postBlog = {postBlog} setMsg = {setMsg} setIsError = {setIsError}/>
    </Toggleable>
  )


  useEffect(() => {
    console.log(blogFormRef.current)
  },[blogFormRef])

  const updateLike = async (newBlog,id) => {
    await blogService.updateBlog(newBlog,id)
    const newBlogs = blogs.map(blog => blog.id===id?newBlog:blog)
    setBlogs(sortBlogs(newBlogs))
  }

  const removeBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs( blogs.filter(blog => blog.id !== id) )
  }


  console.log(user)

  const logOut = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const loginPage = () => (<LoginForm setUser = {setUser} setMsg = {setMsg} setIsError = {setIsError}/>)


  console.log(blogs)
  if (user === null){
    return (
      <div>
        <h2>Blogs</h2>
        <Notification msg = {msg} isError = {isError}/>
        {loginPage()}
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <Notification msg = {msg} isError = {isError}/>
        <div>
          <p>{user} logged in</p>
          <button className = 'logout' onClick = {logOut}>Logout</button>
          {noteform()}
        </div>
        <div className = 'blogs'>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}  removeBlog = {removeBlog}>
              <Details updateLike ={updateLike} blog = {blog} />
            </Blog>
          )}
        </div>
      </div>
    )
  }
}

export default App
