require "rails_helper"

RSpec.describe "Users", type: :request do
  # initialize test data

  let(:user) { create(:user) }
  let(:user_id) { user.id }
  let(:headers) { valid_headers.except("Authorization") }
  let(:valid_attributes) do
    attributes_for(:user, password_confirmation: user.password)
  end

  # Test suite for GET /users
  describe "GET /api/users" do
    # make HTTP get request before each example
    before { get "/api/users", params: {}, headers: valid_headers }

    it "returns users" do
      # puts response
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(3) # lenght of user object + page & pages keys
    end

    it "returns status code 200" do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /users/:id
  describe "GET /api/users/:id" do
    before { get "/api/users/#{user_id}", params: {}, headers: valid_headers }

    context "when the record exists" do
      it "returns the user" do
        expect(json).not_to be_empty
        expect(json["id"]).to eq(user_id)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end

    context "when the record does not exist" do
      let(:user_id) { 1000 }

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end

      it "returns a not found message" do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  # Test suite for POST /users
  describe "POST /api/users" do
    # valid payload
    let(:valid_attributes) { {name: "Edward Elric", email: "foo@bar.com", age: 33, password: "test123", password_confirmation: "test123"} }

    context "when valid request" do
      before { post "/api/signup", params: valid_attributes.to_json, headers: headers }

      it "creates a new user" do
        expect(response).to have_http_status(201)
      end

      it "returns success message" do
        expect(json["message"]).to match(/Account created successfully/)
      end

      it "returns an authentication token" do
        expect(json["auth_token"]).not_to be_nil
      end
    end

    context "when invalid request" do
      before { post "/api/signup", params: {}, headers: headers }

      it "does not create a new user" do
        expect(response).to have_http_status(422)
      end

      it "returns failure message" do
        expect(json["message"]).to match(/can't be blank, can't be blank, can't be blank, can't be blank, is not a number, can't be blank, is invalid/)
      end
    end

    context "when the request is invalid" do
      before { post "/api/users", params: {name: "Edward Elric", email: "foo@bar.com"} }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        expect(response.body).to match(/can't be blank, can't be blank, can't be blank, is not a number/)
      end
    end

    context "when password and password_confirm do not match" do
      before { post "/api/users", params: {name: "Edward Elric", email: "foo@bar.com", age: 33, password: "test123", password_confirmation: "123-test"} }

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "returns a validation failure message" do
        expect(response.body).to match(/doesn't match Password/)
      end
    end
  end

  # Test suite for PUT /users/:id
  describe "PUT /api/users/:id" do
    let(:valid_attributes) { {name: "Edward Elric", email: "foo@bar.com", password: "test123", password_confirmation: "test123"} }

    context "when the record exists" do
      before { put "/api/users/#{user_id}", params: valid_attributes.to_json, headers: valid_headers }

      it "updates the record" do
        expect(response.body).to be_empty
      end

      it "returns status code 204" do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /users/:id
  describe "DELETE /api/users/:id" do
    before { delete "/api/users/#{user_id}", params: {}, headers: valid_headers }

    it "returns status code 204" do
      expect(response).to have_http_status(204)
    end
  end
end
