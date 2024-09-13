import { useState } from "react"

const BlogForm = ({addUpdateBlog}) =>{
    const [blog, setBlog] = useState({
              title: "", author: "", url: "", likes: 0
              })
       
    const handleBlog = (event) =>{
       event.preventDefault()
       addUpdateBlog(blog)
    }

    return(
        <div>
        <form onSubmit={handleBlog}>

          <label htmlFor="title">Title:</label>
          <input onChange = {({target}) => setBlog({...blog, ...{title: target.value}})}
                 name = "title"
                 id = "title"
                 value = {blog.title}/>

          <label htmlFor="author">Author:</label>
          <input onChange = {({target}) => setBlog({...blog, ...{author: target.value}})}
                 name = "author"
                 id = "author"
                 value = {blog.author}/>
          
          <label htmlFor="url">Url:</label>
          <input onChange = {({target}) => setBlog({...blog, ...{url: target.value}})}
                 name = "url"
                 id = "url"
                 value = {blog.url}/>

          <label htmlFor="likes">Likes:</label>
          <input onChange = {({target}) => setBlog({...blog, ...{likes: target.value}})}
                 name = "likes"
                 id = "likes"
                 value = {blog.likes}/>

          <button type="submit">Save</button>
        </form>
      </div>
    )
}

export default BlogForm