class RoomsController < ApplicationController
  # def create
  #   @room = Room.create(name: params[:name])
  #   redirect_back(fallback_location: root_path)
  # end

  def video
    head :no_content
    ActionCable.server.broadcast "session_channel", session_params
  end

  def show
    @room = Room.includes(:messages,{messages: :user}).find(params[:id])
    @messages = @room.messages.with_attached_photo.includes(:user,{photo_attachment: :blob})
    @rooms = Room.all
  end
  
  def stoptyping
    ActionCable.server.broadcast "typing_channel",{user_id: "#{current_user.id}",id: "#{params[:room]}",message: ' is Typing', body: "#{current_user.name}"}
  end
  
  def typingstatus
    ActionCable.server.broadcast "styping_channel", {user_id: "#{current_user.id}",id: "#{params[:room]}",message: "", body: "#{current_user.name}"}
  end

  def start
    # ActionCable.server.broadcast "session_channel", session_params
    ActionCable.server.broadcast "session_channel", {type: "#{params[:type]}",from: "#{params[:from]}",to: "#{params[:to]}",sdp: "#{params[:sdp]}",candidate: "#{params[:candidate]}",room: "#{params[:room]}"}
  end

  private
    def session_params
      params.require(:room).permit(:type, :from, :to, :sdp, :candidate, :room)
    end
end