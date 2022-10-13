class MessagesController < ApplicationController
  def create
    @message = Message.new(user_id: current_user.id, room_id: params[:room_id], content: params[:content],photo: params[:photo] )
    @message.save if params[:content].present? || params[:photo].present?
      # url = url_for(@message.photo) if @message.photo.attached?
      # if @message.room.messages.count > 1
      #   if @message.room.messages[-2].user.id == current_user.id
      #     ActionCable.server.broadcast "same_channel",{msg_id: "#{@message.id}",m_id: "#{@message.room.messages[-2].id}",id: "#{params[:room_id]}",message: "#{params[:content]}",body: "#{current_user.name}",user_id: "#{current_user.id}",photo: "#{params[:photo]}",url: "#{url}"}
      #   else
      #     ActionCable.server.broadcast "room_channel",{m_id: "#{@message.id}",room_id: "#{params[:room_id]}",message: "#{params[:content]}",body: "#{current_user.name}",user_id: "#{current_user.id}",photo: "#{params[:photo]}",url: "#{url}"}
      #   end
      # else
      #   ActionCable.server.broadcast "room_channel",{m_id: "#{@message.id}",room_id: "#{params[:room_id]}",message: "#{params[:content]}",body: "#{current_user.name}",user_id: "#{current_user.id}",photo: "#{params[:photo]}",url: "#{url}"}
      # end
    @room = Room.includes(:messages,{messages: :user}).find(params[:room_id])
    @messages = @room.messages.with_attached_photo.includes(:user,{photo_attachment: :blob})
    @rooms = Room.all
    respond_to do |format|
      format.html 
      format.js
    end
    # render 'rooms/show'
  end
end
