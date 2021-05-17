class User < ApplicationRecord
  SECRET_KEY = Rails.application.secrets.secret_key_base. to_s

  has_secure_password

  validates :firstname, :lastname, :password, presence: true
  validates :email, uniqueness: { case_sensitive: false }, presence: true
  validates :password, length: { minimum: 6 }
  validates :email, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validate :validate_password_requirements

  has_one :user_token
  has_many :chat_rooms, dependent: :destroy
  has_many :messages, dependent: :destroy

  scope :search_by_name, ->(name) { where("firstname like ? OR lastname like ?", "%#{name}%", "%#{name}%")}

  private

  def validate_password_requirements
    rules = {
      " must contain at least one lowercase letter"  => /[a-z]+/,
      " must contain at least one uppercase letter"  => /[A-Z]+/,
      " must contain at least one digit"             => /\d+/,
      " must contain at least one special character" => /[^A-Za-z0-9]+/
    }

    rules.each do |message, regex|
      errors.add( :password, message ) unless password.match( regex )
    end
  end
end
