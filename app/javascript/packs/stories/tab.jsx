import React, { Fragment, useState, useEffect } from 'react'
import StoryList from './list'
import SearchBar from './search-bar'
import Pagination from './pagination'

const propsChange = (prevProps, nextProps) => {
  const oldSelectedStory = (prevProps.storyDetails.story || {}).id
  const newSelectedStory = (nextProps.storyDetails.story || {}).id

  if (prevProps.displaySidebar === nextProps.displaySidebar && oldSelectedStory === newSelectedStory) {
    return true
  }

  return false
}

const StoryTab = (props) => {
  const [paginationMetadata, setPaginationMetadata] = useState('')
  const [loading, setLoading] = useState(false)
  const [stories, setStories] = useState([])
  const [query, setQuery] = useState('')
  const [currentTab, setCurrentTab] = useState('recent')

  useEffect(fetchStories, [currentTab])

  function fetchStories(page = 1) {
    new Promise((resolve, _reject) => resolve(setLoading(true))).then(
      fetch(`/stories/search/${currentTab}?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          const { stories, pagination } = data

          setStories(stories)
          setPaginationMetadata(pagination)
        })
        .then(() => setLoading(false))
    ).catch((error) => console.log(error))
  }

  function isCurrentTab(tab) {
    return currentTab === tab
  }

  const { previewStory, storyDetails, displaySidebar } = props

  return (
    <div className={`sidebar column is-paddingless ${displaySidebar ? '' : 'hidden'} ${paginationMetadata.count <= 20 ? 'no-pagination' : ''}`}>
      <div className='story__tab-container'>
        <p className='story__tab-title is-size-5 has-text-white has-background-primary'><i className='fas fa-book'/> Stories</p>
        <div className='tabs is-fullwidth'>
          <ul>
            <li className={`${isCurrentTab('recent') ? 'is-active' : ''}`}>
              <a onClick={() => setCurrentTab('recent')}>
                <i className='fas fa-clock'/>&nbsp;&nbsp;Recent Updates
              </a>
            </li>
            <li className={`${isCurrentTab('all') ? 'is-active' : ''}`}>
              <a onClick={() => setCurrentTab('all')}>
                <i className='fas fa-heart'/>&nbsp;&nbsp;Favorites
              </a>
            </li>
          </ul>
        </div>
        <div className='tab-content'>
          <SearchBar query={query} setQuery={setQuery} loading={loading}/>
          <StoryList stories={stories} loading={loading} query={query} previewStory={previewStory} storyDetails={storyDetails} paginationMetadata={paginationMetadata}/>
          <Pagination paginationMetadata={paginationMetadata} fetchStories={fetchStories}/>
        </div>
      </div>
    </div>
  )
}

export default React.memo(StoryTab, propsChange)
