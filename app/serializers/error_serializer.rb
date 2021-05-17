module ErrorSerializer
  def self.serialize(status, options = {})
    if options[:message]
      [
        {
          status: status,
          detail: options[:message]
        }
      ]
    else
      options[:object].errors.messages.map do |field, errors|
        errors.map do |error_message|
          {
            status: status,
            source: field.to_s,
            detail: error_message
          }
        end
      end.flatten
    end
  end
end
