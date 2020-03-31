class Story < ApplicationRecord
  enum status: { ongoing: 1, completed: 2 }

  def link(chapter: 1)
    "https://www.fanfiction.net/s/#{story_id}/#{chapter}"
  end
end
