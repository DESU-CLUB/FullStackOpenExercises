import { useState } from 'react'


const Blog = (props) => {
  const [visible,setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
  }


  const deletion = () => {
    props.removeBlog(props.blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible?'Hide':'Show'
  const detailStyle = { display: visible?'':'none' }
  return(
    <div className = 'Fixed' style={blogStyle}>
      <div className='Shown'>
        {props.blog.title} {props.blog.author}
        <button onClick={handleVisibility} className = 'Joe'>{label}</button>
      </div>
      <div className = 'Hidden' style={detailStyle}>
        {props.children}
        <button className = 'deleter' onClick={deletion}>Remove</button>
      </div>
    </div>
  )}

export default Blog