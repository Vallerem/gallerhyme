module V2
  class UsersController < ApplicationController
    def index
      json_response({message: "V2 ready!"})
    end
  end
end
