class TypingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "typing_channel"
  end

  def unsubscribed
  end
end
