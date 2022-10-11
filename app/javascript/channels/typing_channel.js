import consumer from "channels/consumer"

consumer.subscriptions.create("TypingChannel", {
  connected() {

    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const box = document.getElementById('typing-'+data.id);
    if (box.textContent.includes(data.user_id)) {
    } else {
      if (box.textContent.includes(data.body)) {
      } else {
        $('#typing-'+data.id).append('<p>'+ data.body + data.message +'</p>');
      }
    }
  }
});
