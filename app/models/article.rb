class Article < ActiveRecord::Base
  belongs_to :user
  belongs_to :tag
  validates :user_id, presence: true
  validates :content, presence: true
  validates :title, presence: true
  validates :tag, presence: true

  def tag!(tags)
    tags = tags.split(" ").map do |tag|
      Tag.find_or_create_by_name(tag)
    end
    self.tags << tags
  end

end
