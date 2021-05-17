module ApplicationCable
  class Connection < ActionCable::Connection::Base
    include AuthConcern

    identified_by :current_user

    def connect
      self.current_user = current_user
    end
  end
end
