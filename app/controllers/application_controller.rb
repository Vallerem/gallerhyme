class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  # - fallback routes for react
  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join("public/index.html").read }
    end
  end

  include Response
  include ExceptionHandler

  # called before every action on controllers
  before_action :authorize_request

  attr_reader :current_user

  private

  # Check for valid request token and return user
  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
