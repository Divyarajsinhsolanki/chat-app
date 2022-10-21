class ChatsController < ApplicationController
  def new
  end


  def video
  end
  
  def index
  end

  def start
    ActionCable.server.broadcast "session_channel", session_params
  end

  private
    def session_params
      params.require(:chat).permit(:type, :from, :to, :sdp, :candidate)
    end
end