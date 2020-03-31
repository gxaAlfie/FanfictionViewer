Rails.application.routes.draw do
  root to: 'stories#index'

  namespace :stories do
    get '/search/:tab', to: 'search#index'
  end

  get '/stories/:id/chapter/:chapters', to: 'stories#show'
end
