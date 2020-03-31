import React, { Fragment, useState, useEffect } from 'react'
import StoryPanel from './stories/panel'
import StoryPreview from './stories/preview'
import StoryTab from './stories/tab'

export default function MainPage() {
  const [storyDetails, setStoryDetails] = useState({})
  const [chapterLoading, setChapterLoading] = useState(false)

  function previewStory({ id, chapters }) {
    new Promise((resolve, _reject) => resolve(setChapterLoading(true))).then(
      fetch(`/stories/${id}/chapter/${chapters}`)
        .then((response) => response.json())
        .then(setStoryDetails)
        .then(() => setChapterLoading(false))
    ).catch((error) => console.log(error))
  }

  return (
    <Fragment>
      <div className='columns is-marginless'>
        <div className='column is-one-third is-paddingless'>
          <StoryTab previewStory={previewStory}/>
          { false && <StoryPanel previewStory={previewStory}/> }
        </div>
        <div className='column is-paddingless'>
          <StoryPreview chapterLoading={chapterLoading} storyDetails={storyDetails}/>
        </div>
      </div>
    </Fragment>
  )
}
