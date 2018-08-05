class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    json_response(@users)
  end

  # GET /users/1
  def show
    json_response(@user)
  end

  # POST /users
  def create
    # @user = User.new(user_params)
    # if @user.save
    #   render json: @user, status: :created, location: @user
    # else
    #   render json: @user.errors, status: :unprocessable_entity
    # end

    # - more clear with an exception handler for !
    @user = User.create!(user_params)
    json_response(@user, :created)
  end

  # PATCH/PUT /users/1
  def update
    # if @user.update(user_params)
    #   render json: @user
    # else
    #   render json: @user.errors, status: :unprocessable_entity
    # end

    @user.update(user_params)
    head :no_content
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    head :no_content 
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.permit(:name, :email, :password_digest, :password_confirmation)
      # params.require(:user).permit(:name, :email, :password_digest, :password_confirmation)
    end
end
