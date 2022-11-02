class Room < ApplicationRecord
    has_many :messages, dependent: :destroy
    validates :name, presence: true

    def self.create_private_room(users, room_name)
        single_room = Room.create(name: room_name)
        single_room
      end

end
