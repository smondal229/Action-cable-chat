class MessagesChannel < ApplicationCable::Channel
  def subscribed
    room = Conversation.find(params[:room])
    stream_for room

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
