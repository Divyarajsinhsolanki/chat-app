import consumer from "channels/consumer"

consumer.subscriptions.create("StypingChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const box = document.getElementById('typing-'+data.id);

    if (box.textContent.includes(data.user_id)) {
      $('#typing-'+data.id).children("p").remove();
    } else {
      if (box.textContent.includes(data.body)) {
        $('#typing-'+data.id).children("p").remove();
      } else {
        $('#typing-'+data.id).children("p").remove();
      }
    }
  }
});
