import React, { Fragment } from 'react'
import Loading from '../shared/loading'

export default function StoryPreview(props) {
  const { chapterLoading, storyDetails } = props

  return (
    <div className='story__preview-container'>
      <Loading loading={chapterLoading}/>
      { !chapterLoading && <div dangerouslySetInnerHTML={{ __html: storyDetails.chapter_text || "<div class='has-text-grey is-size-4 story__list-placeholder'>Select Story to Preview</div>"}}/> }
    </div>
  )
}
