Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  get 'messages/new'
  post 'messages/create'
  get 'messages/index'
  get 'rooms/new'
  post 'rooms/create'
  get 'rooms/index'
  root 'pages#index'

  get 'pages/path'
  resources :rooms do
  get 'stoptyping', action: :stoptyping, on: :collection
  get 'typingstatus', action: :typingstatus, on: :collection
    member do
      get :show
    end
  end


  devise_scope :user do
    get "users", to: "devise/sessions#new"
  end
  devise_for :users
end
