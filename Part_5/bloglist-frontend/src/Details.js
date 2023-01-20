const Details = (props) => {

  const updateBlog = () => {
    const newBlog = { ...props.blog }
    newBlog.likes = newBlog.likes+1
    props.updateLike(newBlog,props.blog.id)
  }

  return(
    <div>
      <p className="url">URL: {props.blog.url}</p>
      <p className="Likes">Likes: {props.blog.likes} <button className = 'Liker' onClick={updateBlog}>Like</button></p>
      <p>{props.blog.user.username}</p>
    </div>
  )
}
export default Details