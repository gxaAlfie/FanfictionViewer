import React from 'react'
import moment from 'moment'

const propsChange = (prevProps, nextProps) => {
  if (prevProps.story.id === nextProps.story.id && prevProps.previewing === nextProps.previewing) {
    return true
  }

  return false
}

const Story = (props) => {
  const { story, previewStory, previewing } = props
  const { id, title, summary, last_updated_at, chapters, story_id } = story

  function previewIcon() {
    const { previewing } = props

    if (previewing) {
      return (
        <div className='story__info--viewing-status'>
          <i className='fas fa-eye'/>
        </div>
      )
    }
  }

  return (
    <a className='story__link' onClick={previewStory}>
      <div className={`story__info ${previewing ? 'viewing' : ''}`}>
        <div className='story__info-container'>
          <div className='story__info--details'>
            <b>{title}</b>
            <small className='has-text-grey is-size-7'>
              <i className='fas fa-clock'/> {moment(last_updated_at).fromNow()} - Chapters: {chapters}
            </small>
          </div>
          {previewIcon()}
        </div>
        <div className='story__info--summary'>
          <p>{summary}</p>
        </div>
      </div>
    </a>
  )
}

export default React.memo(Story, propsChange)
