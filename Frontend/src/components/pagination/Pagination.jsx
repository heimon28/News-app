import React from 'react'
import { Link } from 'react-router-dom'

function Pagination({onPageChange, blog, currentPage, page}) {
    const totalPage = Math.ceil(blog.length / page)
  const renderPaginationLink = () => {
    return Array.from({length: totalPage}, (_, i) => i + 1).map((pageNumber) => (
        <li className={pageNumber === currentPage ? "activePagination" : ""} key={pageNumber}>
            <Link onClick={() => pageNumber(pageNumber)}>{pageNumber}</Link>
            </li>
    ))
  }
  return ( 
    <div className='w-full'>
      <ul className='flex justify-evenly mx-52'>
        <li>
            <button onClick={() => onPageChange(currentPage -1)} disabled={currentPage === 1}>Previous</button>
        </li>
        <div className='flex gap-3 mx-5'>{renderPaginationLink()}</div>
        <li><button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPage}>Next</button></li>
      </ul>
    </div>
  )
}

export default Pagination
