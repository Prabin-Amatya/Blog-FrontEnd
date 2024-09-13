import { useState } from "react"


const Blog = ({ blog, increaseLikes, removeBlog }) =>
    {  
      const [visibility, toggleVisibility] = useState(false) 
    
      const visibilityClass = {
        display: visibility? "": "none"
      }
    
    
      return(
        <div key={ blog.id } className="blog">
            <p className="title">{ blog.title }
    
            <button onClick= { () => toggleVisibility( !visibility ) } className="toggleButton">{
                  visibility? "Hide": "Show"
            }</button>
    
            <button onClick= { () => removeBlog(blog) }>Remove</button>
    
            </p>
          
            <p style= { visibilityClass } className="author">
              <b>Author:</b> { blog.author }
            </p>
    
            <p style= { visibilityClass } className="url">
              <b>Url:</b> { blog.url }
            </p>
    
            <p style= { visibilityClass } className="likes">
              <b>Likes:</b> { blog.likes }
    
              <button onClick={() => increaseLikes(blog)} className="likeButton">Like</button>
            </p>
    
            <p style= {visibilityClass} className="user">
              <b>User:</b> { blog.userId.userName }
            </p>
              
        </div>  
      )
    }

export default Blog