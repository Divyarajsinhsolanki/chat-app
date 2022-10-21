import consumer from "channels/consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
  },

  disconnected() {
  },
  
  received(data) {
  console.log(data)
    $('#allmessages').append(data.message)
    window.scrollTo(0,document.body.scrollHeight);
  }
});
