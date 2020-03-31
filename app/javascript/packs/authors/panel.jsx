import React from 'react'

export default function AuthorPanel() {
  return (
    <div className='panel is-info'>
      <p className='panel-heading'><i className='fas fa-user'/> Authors</p>
      <div className='panel-tabs'>
        <a className='is-active'>Recent Updates</a>
        <a>Favorites</a>
      </div>
      <a className='panel-block' href='#'>
        DUDE
      </a>
    </div>
  )
}
