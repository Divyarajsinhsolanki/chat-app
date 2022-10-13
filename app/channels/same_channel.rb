class SameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "same_channel"
  end

  def unsubscribed
  end
end
