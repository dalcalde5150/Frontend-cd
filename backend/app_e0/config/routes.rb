Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  },
  path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    sign_up: 'register'
  }
  
  root 'home#index'
  patch 'home', to: 'home#update', as: 'home_update'
  get "/event", to: 'api#get_data', as: 'get_data'
  post "/worker", to: 'api#post_workers', as: 'post_workers'

end
