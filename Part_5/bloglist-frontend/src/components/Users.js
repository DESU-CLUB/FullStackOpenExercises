import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialiseUsers } from '../reducers/usersReducer'
import { Table } from 'antd'
const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(initialiseUsers())
        }, []
    )
    console.log(users)
    if (users === null) {
        return null
    }
    const datasource = users.map(
        user => ({
            key: user.id,
            link: <Link key={user.id} to={`/user/${user.id}`}>{user.name}</Link>,
            len: user.blog.length
        }))

    const cols = [{
        title: 'Author',
        dataIndex: 'link',
        key: 'link'
    },
    
    {
        title: "Number of blogs",
        dataIndex: 'len',
        key: 'len'
}

]
    return (
        <div>
            <h2>
                Users
            </h2>
            <Table dataSource={datasource} columns={cols}/>



        </div>
    )
}

export default Users