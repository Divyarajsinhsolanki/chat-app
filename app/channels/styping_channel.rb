class StypingChannel < ApplicationCable::Channel
  def subscribed
    stream_from "styping_channel"
  end

  def unsubscribed
  end
end
