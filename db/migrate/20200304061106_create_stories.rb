class CreateStories < ActiveRecord::Migration[6.0]
  def change
    create_table :stories do |t|
      t.integer :chapters, default: 1
      t.string :story_id
      t.string :title
      t.text :summary
      t.bigint :word_count
      t.text :page_link
      t.integer :status
      t.datetime :last_updated_at

      t.timestamps
    end
  end
end
