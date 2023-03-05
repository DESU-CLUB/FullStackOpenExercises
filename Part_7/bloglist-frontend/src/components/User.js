import { Divider, List } from "antd"

const User = ({ user }) => {
    console.log(user)
    if (!user) {
        return null
    }

    const content = user.blog.map(blog => blog.title)
    return (
        <div>
            <Divider orientation="left">Added Blogs</Divider>
            <List header = {<h2>{user.name}</h2>} dataSource={content} 
            renderItem = {(item)=> ( <List.Item><p>{item}</p></List.Item> )}
            />
        </div>
    )
}

export default User;