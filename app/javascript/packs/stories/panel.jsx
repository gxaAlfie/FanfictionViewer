import React, { useState, useEffect } from 'react'
import StoryList from './list'
import Loading from '../shared/loading'
import SearchBar from './search-bar'

export default function StoryPanel(props) {
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

  return (
    <div className='panel is-primary'>
      <p className='panel-heading'><i className='fas fa-book'/> Stories</p>
      <div className='panel-tabs'>
        <a className={`${isCurrentTab('recent') ? 'is-active' : ''}`} onClick={() => setCurrentTab('recent')}>Recent Updates</a>
        <a className={`${isCurrentTab('all') ? 'is-active' : ''}`} onClick={() => setCurrentTab('all')}>Favorites</a>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      <Loading loading={loading}/>
      <StoryList stories={stories} loading={loading} query={query} previewStory={props.previewStory}/>
    </div>
  )
}
