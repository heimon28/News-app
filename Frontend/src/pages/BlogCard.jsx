import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({blog,currentPage, selectedCategory, page}) {
  let item = blog
  // .filter((blog) => !selectedCategory || blog.category === selectedCategory)
  // .slice((currentPage -1)* page, currentPage * page)
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 space-x-2 gap-8 mx-2 my-2'>
      {item.map((blog) => <Link to={`/single/${blog._id}`} className='hover:bg-slate-200 shadow-lg p-5 rounded' key={blog.id}>
      <div><img src={blog.image} alt="" className='w-full'/></div>
      <h3 className='font-bold text-sm mt-2 mb-2'>{blog.title}</h3>
      <p className='text-sm text-gray-500'>{blog.author}</p>
      <p className='text-sm text-gray-500'>Published: publice date  </p>
      </Link>)}
     
    </div>
  )
}

export default BlogCard
