class AddTagIdToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :tag_id, :integer
  end
end
