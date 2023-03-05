import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeMessage } from "../reducers/messageReducer";
import { createBlog } from '../reducers/blogReducer'
import { Form, Input, Button } from "antd";
const Noteform = () => {
  // eslint-disable-next-line no-unused-vars
  const [message, dispatch] = [useSelector(state => state.message), useDispatch()]
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async () => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      dispatch(createBlog(newBlog));
    }
    catch (exception) {
      console.log(exception);
      if (exception.response.status === 400) {
        dispatch(makeMessage({ data: "Error: Fields left blank.", error: true }))
      } else if (exception.response.status === 401) {
        dispatch(makeMessage({ data: "Unauthorised User", error: true }))
      }
    }
    dispatch(makeMessage({ data: `${title} has been posted by ${author}`, error: false }))
    setAuthor("");
    setUrl("");
    setTitle("");
  };

  return (
    <Form onFinish={addBlog}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, maxHeight: 3000, height: 300 }}
    >
      <h1>Create New</h1>
      <Form.Item label="Title" name="Title" rules={[{ required: true, message: "Please input Title!" }]}>
        <Input
          id="title"
          name="Title"
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Item>
      <Form.Item label="Author" name="Author" rules={[{ required: true, message: "Please input Author!" }]}>
        <Input
          id="name"
          name="author"
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Item>
      <Form.Item label="URL" name="URL" rules={[{ required: true, message: "Please input URL!" }]}>
        <Input
          id="url"
          name="url"
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Item>
      <Button id="blogSubmit" type = 'primary' htmlType="submit">
        Create
      </Button>
    </Form>
  );
};

export default Noteform;
