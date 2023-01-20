import React from 'react'
import { render,screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './components/Blog'
import Details from './Details'
import Noteform from './components/NoteForm'

describe('Frontend tests',() => {
  let container
  beforeEach(() => {
    const blog = {
      author: 'Shibad',
      id: '63bfc8e8e513a6619e1241fe',
      likes: 20,
      title: 'Shembed',
      url: 'www.gofuckyourself.com',
      user: { username:'Al Qutali' }
    }
    container = render(
      <Blog blog = {blog} >
        <Details blog = {blog}/>
      </Blog>
    ).container
  })

  test('Blog renders title, hides details',async() => {
    const div = container.querySelector('.Hidden')
    expect(div).toHaveStyle('display: none')
    const showDiv = container.querySelector('.Fixed')
    expect(showDiv).not.toHaveStyle('display: none')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.Likes')
    const shown = container.querySelector('.Shown')
    expect(shown).toHaveTextContent('Shibad')
    expect(shown).toHaveTextContent('Shembed')
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

  })

  test('Button controls visibility', async() => {
    const div = container.querySelector('.Hidden')
    const user = userEvent.setup()
    const button = container.querySelector('.Joe')
    await user.click(button)
    expect(div).not.toHaveStyle('display: none')
  })

  test('Handler called twice',async () => {
    const mockHandler = jest.fn()
    const blog = {
      author: 'Shibad',
      id: '63bfc8e8e513a6619e1241fe',
      likes: 20,
      title: 'Shembed',
      url: 'www.gofuckyourself.com',
      user: { username:'Al Qutali' }
    }
    container = render(
      <Blog blog = {blog} >
        <Details blog = {blog} updateLike = {mockHandler}/>
      </Blog>
    ).container

    const button = container.querySelector('.Liker')
    const user = userEvent.setup()
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('Create Handler called',async () => {
    const mockHandler = jest.fn()
    container = render(
      <Noteform postBlog = {mockHandler} setMsg = {mockHandler} setIsError = {mockHandler}/>
    ).container

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('Create')
    const user = userEvent.setup()
    await user.type(title,'testing form')
    await user.type(author,'testing form')
    await user.type(url,'testing form')
    await user.click(sendButton)

    expect(mockHandler.mock.calls[0][0].title).toBe('testing form')
    expect(mockHandler.mock.calls[0][0].author).toBe('testing form')
    expect(mockHandler.mock.calls[0][0].url).toBe('testing form')

  })
})