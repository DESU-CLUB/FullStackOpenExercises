import { useDispatch } from 'react-redux'
import { makeMessage } from '../reducers/messageReducer'
import { useState } from 'react'
import helper from '../services/blogs'
import { updateBlog } from '../reducers/blogReducer'
import { Form, Input, Button } from 'antd'
const CommentForm = ({ identity }) => {
    const comment = fieldHook('text')
    const dispatch = useDispatch()
    const postComment = async () => {
        console.log(identity)
        const newComment = {
            comment: comment.value
        }
        const res = await helper.postComment(newComment, identity)
        console.log(res)
        dispatch(updateBlog({ blog: res, id: identity }))
        dispatch(makeMessage({ data: `${comment.value} posted`, error: false }))
    }
    return (
        <Form onFinish={postComment} labelCol={{ span: 3 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, maxHeight: 3000, height: 100 }}>
            <Form.Item>
                <Input {...comment} />
            </Form.Item>
            <Button type="primary" htmlType='submit'>Add new comment</Button>
        </Form>
    )
}

const fieldHook = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    return {
        type,
        value,
        onChange,
        placeholder: 'Enter comment'
    }
}

export default CommentForm