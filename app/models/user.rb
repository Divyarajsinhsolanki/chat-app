class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages

  def self.online
    ids = ActionCable.server.pubsub.redis_connection_for_subscriptions.smembers "online"
    where(id: ids)
  end

  def name
    email.split('@')[0]
  end
end
