module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show, :update, :destroy]
      before_action :check_is_same_user, only: [:update, :destroy]
      skip_before_action :authorize_request, only: :create

      # GET /users
      def index
        @users = User.all.paginate(page: params[:page])
        json_response({users: @users, page: @users.current_page, pages: @users.total_pages})
      end

      # GET /users/1
      def show
        json_response(@user)
      end

      # POST /users
      def create
        user = User.create!(user_params)
        auth_token = AuthenticateUser.new(user.email, user.password).call
        response = {message: Message.account_created, auth_token: auth_token}
        json_response(response, :created)
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

      # Check current user for delete and update
      def check_is_same_user
        if current_user.email != @user.email
          return json_response(message: "Wrong credentials")
        end
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.permit(:name, :email, :age, :password, :password_confirmation)
      end
    end
  end
end
