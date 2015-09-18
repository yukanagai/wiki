# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create [
  {first_name: 'Yuka', last_name: 'Nagai', email: 'yukanagai@gmail.com', password: 'interweb', password_confirmation: 'interweb'}
  ]

Tag.create [
  {name: 'Plants'}
]

Article.create [
  {title: "Good morning", content: "lkadjfl;ajsdfl;akjdsfl;aksdjfal;skdf", user_id: 1, tag_id: 1}
]
