import React, { Fragment, useEffect } from 'react'
import Story from './story'
import Loading from '../shared/loading'

const propsChange = (prevProps, nextProps) => {
  const oldStoryList = prevProps.stories.map((story) => story.id).toString()
  const newStoryList = nextProps.stories.map((story) => story.id).toString()

  const oldSelectedStory = (prevProps.storyDetails.story || {}).id
  const newSelectedStory = (nextProps.storyDetails.story || {}).id

  const { loading, query } = prevProps

  if (oldStoryList === newStoryList && loading === nextProps.loading && oldSelectedStory === newSelectedStory && query === nextProps.query) {
    return true
  }

  return false
}

const StoryList = (props) => {
  const { stories, loading, query, previewStory, storyDetails } = props
  const filteredStories = query ? stories.filter((story) => story.title.toLowerCase().includes(query.toLowerCase())) : stories

  if (loading) {
    return <Loading loading={loading}/>
  }

  if (filteredStories.length === 0) {
    return (
      <div className='story__list--empty has-text-grey is-size-4'>
        No Stories Found
      </div>
    )
  }

  return (
    <Fragment>
      <div className='story__list'>
        { filteredStories.map((story) => {
          const { id, chapters } = story

          return (
            <Story key={`story-${id}`} story={story} previewStory={(() => previewStory({ id, chapters, loading: 'story' }))} previewing={id === (storyDetails['story'] || {}).id}/>
          )
        })}

      </div>
    </Fragment>
  )
}

export default React.memo(StoryList, propsChange)
