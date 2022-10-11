class MessagesController < ApplicationController
  def create
    @message = Message.new(user_id: current_user.id, room_id: params[:room_id], content: params[:content])
    if @message.save
      ActionCable.server.broadcast "room_channel",{id: "#{params[:room_id]}",message: "#{params[:content]}",body: "#{current_user.name}",user_id: "#{current_user.id}"}
    end
    @room = Room.includes(:messages,{messages: :user}).find(params[:room_id])
    @messages = @room.messages
    @rooms = Room.all
    render 'rooms/show'
  end
end
