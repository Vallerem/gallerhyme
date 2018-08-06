class User < ApplicationRecord
  has_secure_password

  # validations
  validates_presence_of :name, :password_digest
  validates_presence_of :email, unique: true
end
