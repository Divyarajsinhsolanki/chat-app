class ApplicationController < ActionController::Base
  def after_sign_in_path_for(resource)
    ActionCable.server.pubsub.redis_connection_for_subscriptions.sadd "online", current_user.id
    ActionCable.server.broadcast "online_channel",{message: ""}
    pages_path_url
  end
end