import React, { Fragment, useState, useEffect } from 'react'
import bulmaCalendar from 'bulma-calendar'

export default function SearchBar(props) {
  useEffect(() => {
    bulmaCalendar.attach('[type="date"]', { showHeader: false, showFooter: false })
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const { query, setQuery, loading } = props
  const disabled = loading || isOpen

  function renderAdvancedSearch() {
    return null

    // Don't implement this since not high on todos. Also need to plan again.
    return (
      <Fragment>
        <div className='control'>
          <a className='button is-default search-bar__advanced-toggler' disabled={loading} onClick={() => setIsOpen(!isOpen) }>
            <i className={`fas ${isOpen ? 'fa-chevron-right' : 'fa-chevron-down'}`}/>
          </a>
        </div>

        <div className={`popover is-popover-right ${isOpen ? 'is-popover-active' : ''}`}>
          <div className='popover-content'>
            <div className='field'>
              <div className='control'>
                <input type='date'/>
              </div>
            </div>
            <div className='field'>
              <div className='control'>
                <button type='button' className='button is-small is-primary'><i className='fas fa-check'/> Submit</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className='field has-addons'>
        <div className='control has-icons-left search-bar__container'>
          <input className='input' type='text' placeholder='Search' value={query} onChange={(event) => setQuery(event.target.value)} disabled={disabled}/>
          <span className='icon is-left'>
            <i className='fas fa-search' aria-hidden='true'/>
          </span>
        </div>
        { renderAdvancedSearch() }
      </div>
    </Fragment>
  )
}
