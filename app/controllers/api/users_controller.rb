class Api::UsersController < Api::BaseController
  skip_before_action :login_required?, only: [:create, :login]

  def index
    if params[:name].present?
      users = User.search_by_name(params[:name]).page(params[:page])
    else
      users = User.page(params[:page])
    end

    render status: :ok, json: json_api_response(data: users, meta: { page: params[:page] || 1, total: users.total_count })
  end

  def create
    user = User.new(user_params)

    if user.save
      jwt = issue_token({ data: user.id })

      render status: :created, json: json_api_response(user, meta: { jwt: jwt, message: "Sign Up Successful" }).as_json
    else
      render_json_error(:unprocessable_entity, object: user)
    end
  end

  def login
    if user = User.find_by(email: params[:email])
      if user.authenticate(params[:password])
        jwt = issue_token(data: user.id)
        render status: :created, json: json_api_response(user, meta: { jwt: jwt, message: "Login Successful" }).as_json
      else
        render_json_error(:unauthorized, message: "Invalid Email or Password")
      end
    else
      render_json_error(:not_found, message: "User Not Found")
    end
  end

  def details
    render status: :ok, json: json_api_response(current_user).as_json
  end

  private

  def user_params
    params.permit(:firstname, :lastname, :email, :password, :password_confirmation)
  end
end
