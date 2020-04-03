import React, { Fragment, useState, useEffect } from 'react'
import StoryList from './list'
import Loading from '../shared/loading'
import SearchBar from './search-bar'

export default function StoryTab(props) {
  const [loading, setLoading] = useState(false)
  const [stories, setStories] = useState([])
  const [query, setQuery] = useState('')
  const [currentTab, setCurrentTab] = useState('recent')

  useEffect(fetchStories, [currentTab])

  function fetchStories() {
    new Promise((resolve, _reject) => resolve(setLoading(true))).then(
      fetch(`/stories/search/${currentTab}`)
        .then((response) => response.json())
        .then(setStories)
        .then(() => setLoading(false))
    ).catch((error) => console.log(error))
  }

  function isCurrentTab(tab) {
    return currentTab === tab
  }

  const { previewStory, storyDetails } = props

  return (
    <div className='story__tab-container'>
      <p className='story__tab-title is-size-5 has-text-white has-background-primary'><i className='fas fa-book'/> Stories</p>
      <div className='tabs is-fullwidth'>
        <ul>
          <li className={`${isCurrentTab('recent') ? 'is-active' : ''}`}>
            <a onClick={() => setCurrentTab('recent')}>Recent Updates</a>
          </li>
          <li className={`${isCurrentTab('all') ? 'is-active' : ''}`}>
            <a onClick={() => setCurrentTab('all')}>Favorites</a>
          </li>
        </ul>
      </div>
      <div className='tab-content'>
        <SearchBar query={query} setQuery={setQuery} />
        <Loading loading={loading}/>
        <StoryList stories={stories} loading={loading} query={query} previewStory={previewStory} storyDetails={storyDetails}/>
      </div>
    </div>
  )
}
