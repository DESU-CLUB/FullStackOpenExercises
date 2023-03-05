/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import Users from "./components/Users";
import { useSelector, useDispatch } from "react-redux";
import { addName } from "./reducers/userReducer";
import { initialiseBlog } from "./reducers/blogReducer";
import { useMatch, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Home from "./components/Homepage";
import LoginForm from "./components/login";
import User from "./components/User";
import Notification from "./components/notification";
import Blogpost from "./components/Blogpost";
import { makeMessage } from "./reducers/messageReducer";
import { SettingOutlined } from '@ant-design/icons'
import { Menu, Layout, Space, Typography, Button } from 'antd'
import { useState } from "react";

const { Title } = Typography

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};



const App = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const messages = useSelector(state => state.message)
  const user = useSelector(state => state.user.username)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blog)
  const [collapsed, setCollapsed] = useState(true)
  const blogMatch = useMatch('/blog/:id')
  const match = useMatch('/user/:id')
  const userDisplayed = match ? users.find(curUser => curUser.id === match.params.id) : null
  const blog = blogMatch ? blogs.find(curBlog => curBlog.id === blogMatch.params.id) : null
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(initialiseBlog())
  }, [dispatch]);

  const { Header, Sider, Content } = Layout;



  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    }
  }


  useEffect(() => {
    const logged = localStorage.getItem("loggedUser");
    if (logged !== null && logged !== undefined) {
      const parseLogged = JSON.parse(logged);
      console.log(parseLogged)
      dispatch(addName(parseLogged.username));
    }
  }, [user]);

  const logOut = () => {
    localStorage.removeItem("loggedUser");
    dispatch(makeMessage({ data: `${user} logged out`, error: true }))
    dispatch(addName(null));
    navigate('/')

  };


  console.log(blog, blogMatch)

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={{
            padding: '0 10px 10px',
          }}>
        <Header style={headerStyle}>
          {user ?
            <div style={{ position: 'absolute', left: '44px' }}>{user} logged in
              <Button style = {{margin: '10px'}}className="logout" onClick={logOut}>
                Logout
              </Button>
            </div>
            : <Link style={{ position: 'absolute', left: '44px' }} to="/login">Login</Link>}
          <Title style={{ display: 'inline' }} level={2}>Blog App</Title>

        </Header>
        <Layout >
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['Home']}
              items={[
                {
                  key: 'Home',
                  icon: null,
                  label: <Link to='/'>Home   </Link>
                },
                {
                  key: 'Users',
                  icon: null,
                  label: <Link to="/users">Users </Link>
                }

              ]}

            />

          </Sider>
          <Content style={{
              padding: 24,
              margin: 0,
              minHeight: 600,
              height: '100%'
              
            }}>
            <div>
              <Notification />
            </div>
            <Routes>
              <Route path='/' element={user ? <Home /> : <Navigate replace to="/login" />} />
              <Route path='/users' element={<Users />} />
              <Route path='/user/:id' element={<User user={userDisplayed} />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/blog/:id' element={<Blogpost blog={blog} />} />
            </Routes>
          </Content>
        </Layout>


      </Layout>
    </Space>
  )

};

export default App;
