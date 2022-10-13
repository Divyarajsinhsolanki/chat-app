import consumer from "channels/consumer"

consumer.subscriptions.create("RoomChannel", {
  connected() {
  },

  disconnected() {
  },
  
  received(data) {
  console.log(data)
    $('#messages').append(data.message)
    // if (data.url.includes("http")){
    //   $('#messages-'+data.room_id).append('<div class="cont-' + data.user_id +'">  <div class="message-box msg- ' + data.user_id + ' "><div style="margin: 0 10px;text-align:left;"class="btn btn-info"><h5>' + data.body + '</h5><div id="sameuser-' + data.m_id + '">' + data.message +'<br><img src="' +data.url+ '"width="100" height="100"></div></div><br></div></div>')
    // } else {
    //   $('#messages-'+data.room_id).append('<div class="cont-' + data.user_id +'">  <div class="message-box msg- ' + data.user_id + ' "><div style="margin: 0 10px;text-align:left;"class="btn btn-info"><h5>' + data.body + '</h5><div id="sameuser-' + data.m_id + '">' + data.message +'</div></div><br></div></div>')
    // }
    window.scrollTo(0,document.body.scrollHeight);
  }
});
