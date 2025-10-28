Rails.application.routes.draw do
  namespace :api do
      resources :available_models, only: [:index]
      resources :predictions, only: [:index, :show, :create] do
        collection do
          post :predict_sync  # Synchronous prediction
        end
      end
  end
end