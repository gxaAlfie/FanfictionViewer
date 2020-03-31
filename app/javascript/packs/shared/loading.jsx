import React from 'react'

export default function Loading(props) {
  const { loading } = props

  if (loading) {
    return (
      <div className='loading-container'>
        <i className='fas fa-spinner fa-spin fa-4x loading'/>
      </div>
    )
  } else {
    return null
  }
}
