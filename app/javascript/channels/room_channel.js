import consumer from "channels/consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
  },

  disconnected() {
  },
  
  received(data) {
    // $('#messages-'+data.id).append('<div style="margin: 0 10px;text-align:left;"class="btn btn-info">  ' + data.body +'<br><h5>' + data.message + '<h5></div><br>')
    $('#messages-'+data.id).append('<div class="cont-' + data.user_id +'">  <div class="message-box msg- ' + data.user_id + ' "><div style="margin: 0 10px;text-align:left;"class="btn btn-info">' + data.body + '<br><h5>' + data.message + '</h5></div><br></div></div>')
    window.scrollTo(0,document.body.scrollHeight);
  }
});
