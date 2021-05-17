class UserSerializer < ActiveModel::Serializer
  attributes :firstname, :lastname, :email

  has_many :chat_rooms
  has_many :messages
end
