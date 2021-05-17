class Api::ChatRoomsController < Api::BaseController
  def index
    user = User.find(params[:user_id])
    chat_rooms = user.chat_rooms

    render status: :ok, json: json_api_response(data: chat_rooms)
  end

  def create
    chat_room = ChatRoom.new(chat_room_params)

    binding.pry
    if chat_room.save
      receiver = User.find(params[:chat_room][:receiver_id])
      receiver.chat_rooms << chat_room

      serialized_data = json_api_response(chat_room)
      ActionCable.server.broadcast "chat_messages_#{chat_room.id}", serialized_data
      head :ok
    end
  end

  private

  def chat_room_params
    params.require(:chat_room).permit(:title, :user_id)
  end
end
