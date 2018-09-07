#  Seeds

# User.destroy_all

# models = ObjectSpace.each_object(Class).select { |klass| klass < ActiveRecord::Base }
# models.each{|m|m.delete_all}

user = User.create(name: "Manuel Valle", age: 27, email: "manu@vallerem.com", password: "test123")

150.times do 
  User.create(name: Faker::Name.name , age: 77, email: Faker::Internet.email , password: "test123")
end
