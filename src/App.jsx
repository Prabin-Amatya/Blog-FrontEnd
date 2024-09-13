import { useEffect, useState, useRef } from 'react'
import blogService from './services/blog'
import BlogTable from './components/BlogTable'
import loginFrom from './components/handleLogin'
import logOutButton from './components/handleLogOut'
import Notification from './components/Notification'
import Toggalable from './components/Toggalable'
import BlogForm from './components/BlogForm'

const App = () =>{

  const [blogs, setBlogs] = useState([])
  

  const [user, setUser] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() =>{
    blogService.getAll().then(new_blogs =>
                            setBlogs(new_blogs))

    }, [])

  useEffect(() =>{
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser)
    {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() =>{
    const interval = setInterval(async () => {
      try{
        await blogService.checkValid()
      }
      catch(exception){
        if(exception)
        {
          window.localStorage.removeItem('loggedInUser')
          setUser(null)
        }
      }
    }, 20000);
    return () => clearInterval(interval)
  }, [])

  const addUpdateBlog = async (blog) => {
    if(!blogs.some(b => b.title.toLowerCase() == blog.title.toLowerCase()))
      {
        try
        {
          const new_blog = await blogService.create(blog)
          setBlogs([...blogs, new_blog])
  
          setMessage("New Blog Added Successfully")
  
          blogReference.current.toggleVisibility()
          
          setTimeout(()=>{
            setMessage(null)
          }, 5000)
        }
  
        catch(exception){
          const errors = exception.response.data.error
  
          if(errors.title) setMessage(errors.title.message)
          else             setMessage(errors)
          
          setTimeout(()=>{
            setMessage(null)
          }, 5000)
        }
      }
      
      else
      {
        const old_blog = blogs.find(b => b.id ==  blog.id)
        old_blog.author = blog.author == null? old_blog.author: blog.author
        old_blog.url = blog.url == null? old_blog.url: blog.url 
        old_blog.likes = blog.likes == null? old_blog.likes: blog.likes
        console.log(old_blog)
        blogService.update(old_blog.id, old_blog)
        setBlogs(blogs.map(b => b.id == old_blog.id? old_blog: b))
        setMessage("Blog Updated Successfully")
        setTimeout(()=>{
          setMessage(null)
        }, 5000)
      }
  }

  const blogReference = useRef()

  const handleBlog =  () =>{
    return(
    <Toggalable buttonLabel="Add Blog" ref={ blogReference }>
        <BlogForm 
        addUpdateBlog={ addUpdateBlog }
        />
    </Toggalable>
    )
  
  }
  

  return(
    <div>
      <Notification message={message}/>

      {user == null? loginFrom({userName, password, blogService, setUser, setUserName, setPassword, setMessage}):
                     handleBlog()}

      {user !== null && blogs!==null && <BlogTable blogs={blogs} setBlogs={setBlogs}/>}

      {user !== null && logOutButton({setUser})}
    </div>
  )
}

export default App
