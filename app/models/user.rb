class User < ApplicationRecord
  has_secure_password

  # validations
  validates_presence_of :name, :password_digest, :age, :email
  validates_uniqueness_of :email, uniqueness: {
                                    message: "should happen once per year",
                                  }
end
