import React, { Fragment } from 'react'
import Story from './story'

export default function StoryList(props) {
  const { stories, loading, query, previewStory, storyDetails } = props
  const filteredStories = query ? stories.filter((story) => story.title.toLowerCase().includes(query.toLowerCase())) : stories

  if (loading) {
    return null
  }

  if (filteredStories.length === 0) {
    return (
      <div className='story__list--empty has-text-grey is-size-4'>
        No Stories Found
      </div>
    )
  }

  return (
    <div className='story__list'>
      { filteredStories.map((story) => {
        const { id, chapters } = story

        return (
          <Story key={`story-${id}`} story={story} previewStory={(() => previewStory({ id, chapters, loading: 'story' }))} previewing={id === (storyDetails['story'] || {}).id}/>
        )
      })}
    </div>
  )
}
