class StoriesController < ApplicationController
  def index
  end

  def show
    story_text = Stories::ChapterContentScraper.call(params)
    render json: { chapter_text: story_text }
  end
end
