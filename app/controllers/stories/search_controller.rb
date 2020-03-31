module Stories
  class SearchController < ApplicationController
    def index
      stories = Story.order(last_updated_at: :desc)

      if params[:tab] == 'recent'
        stories = stories.where('last_updated_at >= :date', date: Date.yesterday.beginning_of_day)
      end

      render json: stories, status: :ok
    end
  end
end
