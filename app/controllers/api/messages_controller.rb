class Api::MessagesController < Api::BaseController
  def create
    message = Message.new(message_params)
    conversation = ChatRoom.find(message_params[:chat_room_id])

    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash

      MessagesChannel.broadcast_to conversation, serialized_data
      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :chat_room_id, :user_id)
  end
end
