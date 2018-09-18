class ApplicationController < ActionController::Base
  include Response
  include ExceptionHandler

  # - fallback routes for react
  def fallback_index_html
    render :file => "public/index.html"
  end

  # def fallback_index_html
  #   respond_to do |format|
  #     format.html { render body: Rails.root.join('public/index.html').read }
  #   end
  # end

  # called before every action on controllers
  before_action :authorize_request

  attr_reader :current_user

  private

  # Check for valid request token and return user
  def authorize_request
    @current_user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
