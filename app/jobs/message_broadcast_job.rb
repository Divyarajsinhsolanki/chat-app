class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast "room_channel",{message: render_message(message)}
  end

  private

  def render_message(message)
    if message.room.messages.count > 1
      if message.room.messages[-2].user.id == message.user.id 
        sameuser = false
      else
        sameuser = true
      end
    else
      sameuser = true
    end
    MessagesController.render partial: 'messages/message', locals: { message: message, sameuser: sameuser}
  end
end
