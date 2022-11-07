class MessagesController < ApplicationController
  def create
    @message = Message.new(user_id: current_user.id, room_id: params[:room_id], content: params[:content],photo: params[:photo] )
    @message.save if params[:content].present? || params[:photo].present?
    # @room = Room.includes(:messages,{messages: :user}).find(params[:id])
    # @messages = @room.messages.with_attached_photo.includes(:user,{photo_attachment: :blob})
    # @rooms = Room.all
    # respond_to do |format|
    #   format.html 
    #   format.js
    # end
    # render "rooms/show"
  end
end
