require 'rails_helper' 
require 'capybara/rails'
require 'capybara/rspec'

RSpec.describe 'Login Feature', type: :feature do
	it "works" do
		# user = User.create(name: "Yuka", password: 'fakepassword')
		# fill_in 'Email Address', with: user.name
		visit '/'
		click_link 'Log In' #looks for the word "Log In"
		binding.pry # dropping content into your rails console
		expect(page.title).to eq "Code + Design" #expect page title to be..
	end
end
