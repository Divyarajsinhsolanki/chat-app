class RoomChannel < ApplicationCable::Channel
  def subscribed
    stop_stream_for current_user 
    stream_from "room_channel"
  end

  def unsubscribed
  end
end
