require 'open-uri'

module Stories
  class FavoriteTabScraper
    include Callable
    include Rescuable

    def initialize(params)
      @page_link = params[:link]
      @page = Nokogiri::HTML(open(params[:link]))
    end

    def call
      error_handler do
        puts 'Starting to fetch stories...'
        Story.import(
          scraped_stories,
          on_duplicate_key_update: {
            conflict_target: [:story_id],
            columns:
              %i[title last_updated_at summary chapters word_count status]
          })
        puts 'Finished fetching story updates!'
      end
    end

    private

    def scraped_stories
      @page.search('.favstories').map do |story_node|
        data_nodes = []
        data_nodes
          .push(story_node.attributes.slice(*required_data_attributes))
        data_nodes.push(story_node.css('.z-indent'))

        Story.new(story_params(data_nodes))
      end
    end

    def story_params(data_nodes)
      data_attributes_node, summary_node = data_nodes

      data_story_params =
        required_data_attributes.each_with_object({}) do |key, acc|
          acc[story_attributes[key]] =
            story_data_value(key, data_attributes_node[key].value)
        end

      data_story_params.merge(summary: story_summary(summary_node))
    end

    def story_data_value(key, value)
      if key == 'data-dateupdate'
        Time.at(value.to_i)
      elsif key == 'data-statusid'
        value.to_i
      else
        value.gsub(/\\'/, "'")
      end
    end

    def story_summary(node)
      node.children.first.text
    end

    def story_attributes
      {
        'data-storyid' => :story_id,
        'data-title' => :title,
        'data-wordcount' => :word_count,
        'data-dateupdate' => :last_updated_at,
        'data-chapters' => :chapters,
        'data-statusid' => :status
      }
    end

    def required_data_attributes
      %w[
        data-storyid data-title data-wordcount
        data-dateupdate data-chapters data-statusid
      ]
    end
  end
end
