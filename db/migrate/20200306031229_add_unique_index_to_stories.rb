class AddUniqueIndexToStories < ActiveRecord::Migration[6.0]
  def change
    add_index :stories, :story_id, unique: true
  end
end
