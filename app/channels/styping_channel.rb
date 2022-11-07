class StypingChannel < ApplicationCable::Channel
  def subscribed
    stop_stream_for current_user 
    stream_from "styping_channel"
  end

  def unsubscribed
  end
end
