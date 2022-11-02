class ChatsController < ApplicationController
  def new
  end


  def index
    ActionCable.server.pubsub.redis_connection_for_subscriptions.sadd "online", current_user.id
    respond_to do |format|
      format.turbo_stream
      format.html { render 'pages/index'}
    end
  end
  
  def start
    ActionCable.server.broadcast "session_channel", session_params
  end
  
  def video
    @localuser = params[:user_id]
    @user = User.find(params[:user_id])
    @current_user = current_user
    @room = Room.new
    @message = Message.new
    @room_name = get_name(@user, @current_user)
    @single_room = Room.where(name: @room_name).first || Room.create_private_room([@user, @current_user], @room_name)
    @messages = @single_room.messages
    render 'video'
  end


private
  def get_name(user1, user2)
    users = [user1, user2].sort
    "private_#{users[0].id}_#{users[1].id}"
  end

  def session_params
    params.require(:chat).permit(:type, :from, :to, :sdp, :candidate, :room, :receiver)
  end
end