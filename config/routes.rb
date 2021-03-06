Rails.application.routes.draw do
  namespace :api do
    scope module: :v2, constraints: ApiVersion.new("v2") do
      resources :users, only: :index
    end

    scope module: :v1, constraints: ApiVersion.new("v1", true) do
      resources :users
      post "signup", to: "users#create"
    end

    post "login", to: "authentication#authenticate"
  end

  # - react-router needs this
  get "*path", to: "application#fallback_index_html", constraints: -> (request) do
                 !request.xhr? && request.format.html?
               end
end
