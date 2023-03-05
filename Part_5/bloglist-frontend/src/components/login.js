import { useState } from "react";
import loginService from "../services/loginService";
import { useDispatch } from "react-redux";
import { makeMessage } from "../reducers/messageReducer";
import { addName } from "../reducers/userReducer";
import helper from "../services/blogs"
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Space } from "antd";
const LoginForm = () => {
  const navigate = useNavigate()
  const [password, setPass] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  const submitForm = async () => {
    try {
      const signIn = await loginService.login({ username, password });
      setUsername("");
      setPass("");
      dispatch(addName(signIn.data.username))
      console.log(signIn);
      dispatch(makeMessage({ data: `${signIn.data.username} signed in`, error: false }));


      helper.setToken(signIn.data.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(signIn.data));
      navigate('/')
    } catch (exception) {
      console.log(exception);
      dispatch(makeMessage({ data: `Invalid name/password`, error: true }));

    }
  };

  return (
    <div>
      <Form
        className="login" onFinish={submitForm}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, maxHeight:3000, height: 600  }}
      >
        <Space direction = 'vertical' style = {{width: '100%'}}> 
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
          <Input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></Input>
        </Form.Item>
        <Form.Item label="Password" name="Password" rules={[{ required: true, message: "Please input password!" }]}>
          <Input.Password
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPass(target.value);
            }}
          ></Input.Password>
        </Form.Item>
        <Button id="loginbutton" type='primary' htmlType="submit">
          Login
        </Button>
        </Space>
      </Form>
    </div>
  );
};

export default LoginForm;
