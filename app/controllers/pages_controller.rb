class PagesController < ApplicationController
  def index
    @rooms = Room.all
  end

  def path
    redirect_to root_path, turbo: false
  end

end
