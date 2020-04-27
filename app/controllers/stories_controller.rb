class StoriesController < ApplicationController
  def show
    story_content = Stories::ChapterContentScraper.call(params)
    render json: story_content
  end
end
