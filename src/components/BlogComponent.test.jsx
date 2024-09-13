import {render} from '@testing-library/react'
import Blog from './BlogComponent'
import userEvent from '@testing-library/user-event'

let blog = {}
let container = {}

beforeEach(()=>{
    blog = {
        title: "test",
        author: "testAuthor",
        url: "/api/blogs/test",
        userId: {
            userName: "testUser"
        },
        likes: 86876
    }
    
    container = render(<Blog blog={blog}/>).container

})

test("renders content", ()=>{
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent("test")
})

test("only title renders when button is clicked", ()=>{
    const p_title = container.querySelector('.title')
    const p_author = container.querySelector('.author')
    const p_url = container.querySelector('.url')
    const p_likes = container.querySelector('.likes')
    const p_user = container.querySelector('.user')
     
    expect(p_title).toHaveStyle("display:block")
    expect(p_author).toHaveStyle("display:none")
    expect(p_url).toHaveStyle("display:none")
    expect(p_likes).toHaveStyle("display:none") 
    expect(p_user).toHaveStyle("display:none") 
})

test("author,url,user,likes render after button is clicked", async()=>{
    const p_title = container.querySelector('.title')
    const p_author = container.querySelector('.author')
    const p_url = container.querySelector('.url')
    const p_likes = container.querySelector('.likes')
    const p_user = container.querySelector('.user')

    const user = userEvent.setup()

    const button = container.querySelector('.toggleButton')
    await user.click(button)
    expect(p_title).toHaveStyle("display:block")
    expect(p_author).toHaveStyle("display:block")
    expect(p_url).toHaveStyle("display:block")
    expect(p_likes).toHaveStyle("display:block") 
    expect(p_user).toHaveStyle("display:block")  
})

test("event handler is called twice when like button clicked twice", async()=>{

    const user = userEvent.setup()
    const increaseLikes = vi.fn()

    const container = render(<Blog blog={blog} increaseLikes={increaseLikes}/>).container
    const button = container.querySelector('.likeButton')

    await user.click(button)
    await user.click(button)

    expect(increaseLikes.mock.calls).toHaveLength(2)
})
