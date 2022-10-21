class TypingChannel < ApplicationCable::Channel
  def subscribed
    stop_stream_for current_user 
    stream_from "typing_channel"
  end

  def unsubscribed
  end
end
