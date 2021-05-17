class Api::BaseController < ActionController::API
  include AuthConcern

  before_action :login_required?
  rescue_from ActiveRecord::RecordNotFound,       with: :not_found!
  rescue_from ActionController::ParameterMissing, with: :missing_parameter

  def json_api_response(resource, options = {})
    options[:adapter] ||= :json_api
    options[:key_transform] ||= :camel_lower
    options[:namespace] ||= API
    options[:serialization_context] ||= ActiveModelSerializers::SerializationContext.new(request)
    options[:serializer] = NullSerializer unless resource

    ActiveModelSerializers::SerializableResource.new(resource, options)
  end

  def render_json_error(status, options = {})
    render status: status, json: { errors: ErrorSerializer.serialize(status, options) }
  end

  def login_required?
    render_json_error(:unauthorized, message: "Login required") if !authenticated?
  end

  def missing_parameter
    render_json_error(:unprocessable_entity, message: "Invalid Params")
  end

  def not_found!
    render_json_error(:not_found, message: "Record not found")
  end
end
