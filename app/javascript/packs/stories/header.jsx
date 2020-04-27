import React, { Fragment } from 'react'

export default function StoryHeader(props) {
  const { storyDetails, storyLoading , setDisplaySidebar, displaySidebar } = props
  const { chapter = 1, story = {} } = storyDetails

  if (!story.title) {
    return null
  }

  function handleChapterSelection(event) {
    const { previewStory, storyDetails } = props
    const { story = {} } = storyDetails
    const selectedChapter = Number(event.target.value)
    previewStory({ id: story.id, chapters: selectedChapter, loading: 'chapter' })
  }

  function chapterSelection() {
    const { storyDetails, previewStory } = props
    const { chapter = 1, story = {} } = storyDetails
    const { chapters = 1} = story

    const chapterOptionValues = Array.from({ length: chapters }, (v,k) => k + 1)
    const chapterOptions = chapterOptionValues.map((num) => <option key={`chapter-${num}`} value={num}>{num}</option>)

    return (
      <div className='navbar-item'>
        <div className='control'>
          <div className='select'>
            <select value={chapter} onChange={handleChapterSelection}>
              {chapterOptions}
            </select>
          </div>
        </div>
      </div>
    )
  }

  if (storyLoading) {
    return null
  }

  return (
    <nav className='navbar story__header' role='navigation'>
      <div className="navbar-brand">
        <span className='navbar-item has-text-weight-bold is-size-4'>
          <a onClick={() => setDisplaySidebar(!displaySidebar)}>
            <i className='fas fa-bars'/>&nbsp;
          </a>
          {story.title}
        </span>
      </div>
      <div className='navbar-end'>
        {chapterSelection()}
      </div>
    </nav>
  )
}
