import Blog from "./BlogComponent"
import blogService from "../services/blog"

const BlogTable = ({ blogs, setBlogs }) =>{

    const increaseLikes = async (blog) =>{
      const new_blog = {...blog, likes: blog.likes+1 }
      await blogService.update(blog.id, new_blog)
      setBlogs(blogs.map(blog => blog.id == new_blog.id? new_blog: blog))
    }

    const removeBlog =  async (blog) =>{
      await blogService.remove(blog.id)

      if(blogs.length!==0)
      setBlogs(blogs.filter(b=>b.id !== blog.id))
    }

    return(
      <div>
        <h2>Blogs</h2>

        <div>
              {
                blogs.map( blog =>
                  <Blog key={ blog.id } blog={ blog } increaseLikes={ increaseLikes } removeBlog={ removeBlog }/>
              )}
        </div>
      </div>
    )
  
}

export default BlogTable