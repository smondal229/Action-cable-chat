Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
  namespace :api do
    resources :users, only: [:index, :create] do
      collection do
        post :login
        get :current, to: "users#details"
      end
    end

    resources :chat_rooms, only: [:index, :create]
    resources :message, only: [:create]
  end
end
