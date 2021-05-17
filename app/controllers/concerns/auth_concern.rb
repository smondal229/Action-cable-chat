require "jwt"

module AuthConcern
  extend ActiveSupport::Concern

  SECRET_KEY_BASE = Rails.application.secrets.secret_key_base
  ALGORITHM = "HS256".freeze

  def save_token(user, jwt_token)
    if prev_token = user.user_token
      prev_token.update(access_token: jwt_token)
    else
      user.create_user_token(access_token: jwt_token)
    end
  end

  def issue_token(payload)
    jwt = JWT.encode(payload.merge(exp: 1.week.from_now.to_i), SECRET_KEY_BASE)
    user = User.find(payload[:data])
    save_token(user, jwt) if user.present? and jwt.present?
    jwt
  end

  def token
    request.env["HTTP_AUTHORIZATION"].scan(/Bearer (.*)$/).flatten.last
  end

  def authenticated?
    decoded_token = JWT.decode(token, SECRET_KEY_BASE)

    if @current_user = User.find(decoded_token.first["data"])
      return @current_user
    else
      return false
    end

  rescue JWT::ExpiredSignature
    return false
  end

  def current_user
    @current_user
  end
end