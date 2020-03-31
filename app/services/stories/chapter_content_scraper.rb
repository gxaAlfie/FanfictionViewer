require 'open-uri'

module Stories
  class ChapterContentScraper
    include Callable
    include Rescuable

    delegate :link, to: :@story

    def initialize(params)
      @chapter = params[:chapters]
      @story = Story.find(params[:id])
    end

    def call
      error_handler do
        page = Nokogiri::HTML(open(link(chapter: @chapter)))
        story_text_node = page.search('.storytext')
        return story_text_node.to_s
      end
    end
  end
end
