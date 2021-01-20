import React from 'react'

const Pagination = (props) => {
  const { paginationMetadata, fetchStories } = props
  const { count, last, next, page, prev } = paginationMetadata

  if (count <= 20) {
    return null
  }

  let pages = Array.from(Array(last), (_, i) => i + 1)
  pages.splice(0,1)
  pages.splice(-1,1)
  const currentPageIndex = pages.findIndex((num) => num === page)
  const middle = currentPageIndex !== -1 ? pages.splice(currentPageIndex, 3) : pages.splice(Math.floor(pages.size / 2), 3)

  function pageLink(num) {
    return `pagination-link ${num === page ? 'is-current' : ''}`
  }

  return (
    <nav className='pagination is-rounded is-small story__pagination'>
      { prev && <a className='pagination-previous' onClick={() => fetchStories(prev)}>Previous</a> }
      { next && <a className='pagination-next' onClick={() => fetchStories(next)}>Next</a> }
      <ul className='pagination-list'>
        <li><a className={pageLink(1)} aria-label='Goto page 1' onClick={() => fetchStories(1)}>1</a></li>
        <li><span className='pagination-ellipsis'>&hellip;</span></li>
        {middle.map((num) => <li key={`page-${num}`}><a className={pageLink(num)} aria-label={`Go to page ${num}`} onClick={() => fetchStories(num)}>{num}</a></li>)}
        <li><span className='pagination-ellipsis'>&hellip;</span></li>
        <li><a className={pageLink(last)} aria-label={`Go to page ${last}`} onClick={() => fetchStories(last)}>{last}</a></li>
      </ul>
    </nav>
  )
}

export default Pagination
