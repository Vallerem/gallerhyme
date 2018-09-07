class User < ApplicationRecord
  has_secure_password

  # Pagination
  self.per_page = 25

  # validations
  validates_presence_of :name, :password_digest, :age, :email
  validates_uniqueness_of :email, message: "An account already exists with this email"
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates_numericality_of :age
end
