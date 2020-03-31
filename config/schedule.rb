every 1.hour do
  command 'heroku run rake db:seed'
end
