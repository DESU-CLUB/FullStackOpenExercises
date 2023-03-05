import { List } from "antd";
import { useDispatch } from "react-redux";
import { putBlog } from "../reducers/blogReducer";
import { makeMessage } from "../reducers/messageReducer";
import CommentForm from "./CommentForm";
const Blogpost = (props) => {
  const dispatch = useDispatch()
  const updateBlog = () => {
    const newBlog = { ...props.blog };
    newBlog.likes = newBlog.likes + 1;
    dispatch(putBlog(newBlog,props.blog.id))
    dispatch(makeMessage({data:`${props.blog.title} has been liked`,error:false}))
  };
  if (props.blog === undefined){
    return null
  }
  console.log(props.blog)
  const data = props.blog.comment.map(comment=> comment.comment)
  return (
    <div>
        <h2>{props.blog.title}</h2>
      <p className="url">URL: {props.blog.url}</p>
      <p className="Likes">
        Likes: {props.blog.likes}{" "}
        <button className="Liker" onClick={updateBlog}>
          Like
        </button>
      </p>
      <p>added by {props.blog.user.username}</p>
      <div>
        <h2>
            Comments
        </h2>
        <CommentForm identity = {props.blog.id}/>
        <List dataSource={data} renderItem = {(item)=> ( <List.Item><p>{item}</p></List.Item> )}>

        </List>
      </div>
    </div>
  );
};
export default Blogpost;
