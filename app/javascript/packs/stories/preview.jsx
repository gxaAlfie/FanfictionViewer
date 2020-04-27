import React from 'react'
import Loading from '../shared/loading'
import StoryHeader from './header'

export default function StoryPreview(props) {
  const { storyLoading, chapterLoading, storyDetails, displaySidebar, previewStory, setDisplaySidebar } = props
  const isLoading = storyLoading || chapterLoading

  return (
    <div className='column is-paddingless'>
      <StoryHeader
        storyDetails={storyDetails}
        storyLoading={storyLoading}
        displaySidebar={displaySidebar}
        previewStory={previewStory}
        setDisplaySidebar={setDisplaySidebar}/>
      <div className='story__preview-container'>
        <Loading loading={isLoading}/>
        { !isLoading && <div dangerouslySetInnerHTML={{ __html: storyDetails.chapter_text || "<div class='has-text-grey is-size-4 story__list-placeholder'>Select Story to Preview</div>"}}/> }
      </div>
    </div>
  )
}
