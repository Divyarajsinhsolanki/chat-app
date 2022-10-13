class RoomsController < ApplicationController
  def create
    @room = Room.create(name: params[:name])
    redirect_back(fallback_location: root_path)
  end

  def show
    @room = Room.includes(:messages,{messages: :user}).find(params[:id])
    @messages = @room.messages.with_attached_photo.includes(:user,{photo_attachment: :blob})
    @rooms = Room.all
  end

  def rtm
    ActionCable.server.broadcast "typing_channel",{user_id: "#{current_user.id}",id: "#{params[:room]}",message: ' is Typing', body: "#{current_user.name}"}
    respond_to do |format|
      format.html 
      format.js
    end
  end

  def rmm
    ActionCable.server.broadcast "styping_channel", {user_id: "#{current_user.id}",id: "#{params[:room]}",message: "", body: "#{current_user.name}"}
    respond_to do |format|
      format.html 
      format.js
    end
  end
end
