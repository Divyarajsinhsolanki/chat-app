import consumer from "channels/consumer"

consumer.subscriptions.create("SameChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    if (data.url.includes("http")){
      $('#sameuser-'+data.m_id).append('<div id="sameuser-'+ data.msg_id +'">'+ data.message + '<br><img src="' + data.url+ '" width="100" height="100"></div>')
    }else{
      $('#sameuser-'+data.m_id).append('<div id="sameuser-'+ data.msg_id +'">'+ data.message + '</div>')
    }
    window.scrollTo(0,document.body.scrollHeight);
  }
});
