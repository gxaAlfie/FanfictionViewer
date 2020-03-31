import React from 'react'
import moment from 'moment'

export default function Story(props) {
  const { story, previewStory } = props
  const { id, title, summary, last_updated_at, chapters, story_id } = story

  return (
    <a className='story__link' onClick={previewStory}>
      <div className='story__info'>
        <div className='story__info--details'>
          <b>{title}</b>
          <small className='has-text-grey is-size-7'>
            <i className='fas fa-clock'/> {moment(last_updated_at).fromNow()} - Chapters: {chapters}
          </small>
        </div>
        <div className='story__info--summary'>
          <p>{summary}</p>
        </div>
      </div>
    </a>
  )
}
