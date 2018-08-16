Rails.application.routes.draw do
  scope module: :v2, constraints: ApiVersion.new('v2') do
    resources :users, only: :index
  end
  
  scope module: :v1, constraints: ApiVersion.new('v1', true) do
    resources :users
  end

  post "signup", to: "users#create"
  post "login", to: "authentication#authenticate"

  # - react-router needs this
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
