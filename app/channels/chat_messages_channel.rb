class ChatMessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_messages_#{params[:id]}_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
