import React, { useState, useEffect } from 'react'
import StoryPreview from './stories/preview'
import StoryTab from './stories/tab'

export default function MainPage() {
  const [storyDetails, setStoryDetails] = useState({})
  const [chapterLoading, setChapterLoading] = useState(false)
  const [storyLoading, setStoryLoading] = useState(false)
  const [displaySidebar, setDisplaySidebar] = useState(true)

  function setLoading(loaderType, loadingState) {
    const loadingFunction = loaderType === 'chapter' ? setChapterLoading : setStoryLoading

    return loadingFunction(loadingState)
  }

  function previewStory({ id, chapters, loading }) {
    new Promise((resolve, _reject) => resolve(setLoading(loading, true))).then(
      fetch(`/stories/${id}/chapter/${chapters}`)
        .then((response) => response.json())
        .then(setStoryDetails)
        .then(() => loading === 'story' && setDisplaySidebar(false))
        .then(() => setLoading(loading, false))
    ).catch((error) => console.log(error))
  }

  return (
    <div className='columns is-marginless'>
      <StoryTab previewStory={previewStory} storyDetails={storyDetails} displaySidebar={displaySidebar}/>
      <StoryPreview
        storyLoading={storyLoading}
        chapterLoading={chapterLoading}
        storyDetails={storyDetails}
        displaySidebar={displaySidebar}
        previewStory={previewStory}
        setDisplaySidebar={setDisplaySidebar}/>
    </div>
  )
}
