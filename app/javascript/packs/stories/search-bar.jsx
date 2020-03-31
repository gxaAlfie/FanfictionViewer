import React from 'react'

export default function SearchBar(props) {
  const { query, setQuery } = props

  return (
    <div>
      <p className='control has-icons-left'>
        <input className='input' type='text' placeholder='Search' value={query} onChange={(event) => setQuery(event.target.value)} />
        <span className='icon is-left'>
          <i className='fas fa-search' aria-hidden='true'/>
        </span>
      </p>
    </div>
  )
}
